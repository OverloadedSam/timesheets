const Timesheet = require('../models/timesheet');
const Task = require('../models/task');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const isValidObjectId = require('../utils/validateObjectId');

/*
 * @route   /task
 * @method  POST
 * @access  Protected
 * @desc    Add a task in a timesheet.
 */
module.exports.addTask = asyncHandler(async (req, res, next) => {
  const taskPayload = { ...req.body };
  const employeeId = req.user._id;
  const timesheetId = taskPayload.timesheet;

  if (!isValidObjectId(timesheetId))
    return next(new ErrorResponse(400, 'Invalid timesheet id!'));

  const timesheet = await Timesheet.findById(timesheetId);
  if (!timesheet)
    return next(new ErrorResponse(404, 'Timesheet id not found!'));

  if (!timesheet.employee.equals(employeeId)) {
    const message = 'You can not add tasks to this timesheet!';
    return next(new ErrorResponse(403, message));
  }

  if (timesheet.rating || timesheet.rating === 0) {
    const message = 'Can not add to timesheet once it has been rated!';
    return next(new ErrorResponse(400, message));
  }

  const task = new Task(taskPayload);
  await task.save();

  await Timesheet.findByIdAndUpdate(timesheetId, {
    $push: { tasks: task._id },
  });

  res.status(201).json({
    success: true,
    status: 201,
    message: 'Task added successfully!',
    ...task._doc,
  });
});
