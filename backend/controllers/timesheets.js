const User = require('../models/user');
const Timesheet = require('../models/timesheet');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const isValidObjectId = require('../utils/validateObjectId');

/*
 * @route   /timesheet
 * @method  POST
 * @access  Admin
 * @desc    Create time sheet in DB.
 */
module.exports.createTimesheet = asyncHandler(async (req, res, next) => {
  const timesheetPayload = { ...req.body };
  const employee = timesheetPayload.employee;
  if (!employee || !isValidObjectId(employee))
    return next(new ErrorResponse(400, 'Invalid employee id'));

  const user = await User.findById(employee);
  if (!user) {
    const message = 'Employee not found for the provided id';
    return next(new ErrorResponse(404, message));
  }

  const timesheet = new Timesheet(timesheetPayload);
  await timesheet.save();

  res.status(201).json({
    success: true,
    status: 201,
    ...timesheet._doc,
  });
});

/*
 * @route   /rate-timesheet/:id
 * @method  POST
 * @access  Manager
 * @desc    Rate a timesheet
 */
module.exports.rateTimesheet = asyncHandler(async (req, res, next) => {
  let { rating, employee } = { ...req.body };
  const timesheetId = req.params.id;
  const manager = req.user;

  if (!rating && rating !== 0)
    return next(new ErrorResponse(400, 'Please provide a rating!'));
  if (rating < 0 || rating > 5)
    return next(new ErrorResponse(400, 'Rating out of range! Allowed 0 - 5'));

  if (!isValidObjectId(timesheetId))
    return next(new ErrorResponse(400, 'Timesheet id is not a valid id!'));

  if (!manager.isManager) {
    const message = 'You can not rate as you are not a manager';
    return next(new ErrorResponse(401, message));
  }

  if (!isValidObjectId(employee))
    return next(new ErrorResponse(400, 'Employee id is not a valid id!'));

  employee = await User.findById(employee);
  if (!employee)
    return next(new ErrorResponse(404, 'Employee with provided id not found!'));

  if (!manager._id.equals(employee.reportsTo))
    return res.status(400).json({
      success: false,
      message: 'You are not the manager of this employee',
    });

  const timesheet = await Timesheet.findById(timesheetId);

  if (!timesheet) return next(new ErrorResponse(404, 'Timesheet not found!'));
  if (timesheet.rating || timesheet.rating === 0)
    return next(new ErrorResponse(400, `You've already rated this timesheet!`));

  timesheet.rating = rating;
  await timesheet.save();

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Rating operation successful',
    data: {
      rating,
    },
  });
});

/*
 * @route   /timesheets
 * @method  GET
 * @access  Protected
 * @desc    Get timesheets of current user.
 */
module.exports.getMyTimesheets = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const timesheets = await Timesheet.find({ employee: userId })
    .populate({ path: 'employee', select: 'name email ' })
    .sort({ date: 'desc', rating: 'asc' });

  res.json({
    success: true,
    status: 200,
    timesheets,
  });
});

/*
 * @route   /timesheets
 * @method  POST
 * @access  Protected
 * @desc    Find timesheets of current user by providing date range.
 */
module.exports.findMyTimesheets = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  let { startDate, endDate } = { ...req.body };

  if (!startDate || !endDate) {
    const message = 'Start and End date, both are required!';
    return next(new ErrorResponse(400, message));
  }

  const timesheets = await Timesheet.find({
    employee: userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .populate({ path: 'employee', select: 'name email ' })
    .sort({ date: 'desc', rating: 'asc' });

  res.json({
    success: true,
    status: 200,
    timesheets,
  });
});

/*
 * @route   /timesheet/:id
 * @method  GET
 * @access  Protected/Manager/Admin
 * @desc    Get a specific timesheet along with tasks.
 */
module.exports.getTimesheet = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const timesheetId = req.params.id;

  const timesheet = await Timesheet.findById(timesheetId)
    .populate({ path: 'employee', select: 'name email reportsTo' })
    .populate('tasks');

  if (!timesheet) return next(new ErrorResponse(404, 'Timesheet not found!'));

  const isAdmin = user.role.roleId === 0;
  const timesheetBelongsToCurrentUser = timesheet.employee._id.equals(user._id);
  if (!timesheetBelongsToCurrentUser && !isAdmin) {
    const isReportingManager = timesheet.employee.reportsTo?.equals(user._id);
    if (!isReportingManager)
      return next(new ErrorResponse(403, 'You can not have this information'));
  }

  const tasks = timesheet.tasks.sort((a, b) => {
    if (a.hour < b.hour) return -1;
    else if (b.hour < a.hour) return 1;
    else if (a.minute < b.minute) return -1;
    else return 0;
  });

  res.json({
    success: true,
    status: 200,
    timesheet: { ...timesheet._doc, tasks },
  });
});

/*
 * @route   /employees-timesheets
 * @method  GET
 * @access  Manager
 * @desc    Get timesheets of employees working under a manager.
 */
module.exports.getEmployeesTimesheets = asyncHandler(async (req, res, next) => {
  const managerId = req.user._id;

  const employees = await User.find({ reportsTo: managerId }).select('name');

  if (!employees || !employees.length) {
    const message =
      'You do not have employees working under you. Hence no timesheets.';
    return next(new ErrorResponse(404, message));
  }

  const timesheets = await Promise.all(
    employees.map(async (employee) => {
      const timesheet = await Timesheet.find({
        employee: employee._id,
      }).populate({ path: 'employee', select: 'name email role' });

      return timesheet;
    })
  );

  let timesheetsArr = [];
  timesheets.forEach((userTimesheets) => {
    userTimesheets.forEach((timesheet) => {
      timesheetsArr.push(timesheet);
    });
  });

  res.json({
    success: true,
    status: 200,
    timesheets: timesheetsArr,
  });
});
