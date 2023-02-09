const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Role = require('../models/role');
const isValidObjectId = require('../utils/validateObjectId');

/*
 * @route   /create-user
 * @method  POST
 * @access  Admin
 * @desc    Create a user in the DB.
 */
module.exports.createUser = asyncHandler(async (req, res, next) => {
  const userPayload = { ...req.body };

  const userExists = await User.findOne({ email: userPayload.email });
  if (userExists) {
    const message = 'User is already registered with this email!';
    return next(new ErrorResponse(400, message));
  }

  const roleId = await Role.findOne({ roleId: userPayload.role });
  if (!roleId)
    return next(new ErrorResponse(400, 'Provide valid role for a user!'));

  userPayload.role = roleId._id;

  if (userPayload.reportsTo && !isValidObjectId(userPayload.reportsTo))
    return next(new ErrorResponse(400, 'Provide valid reporting manager!'));

  const manager = await User.findById(userPayload.reportsTo).populate('role');
  if (userPayload.manager && !manager) {
    const message = 'Manager not found with the given id!';
    return next(new ErrorResponse(400, message));
  }

  // Manager's ID
  if (userPayload.reportsTo && manager.role.roleId !== 1) {
    const message =
      'The ID you gave for the manager is not an ID of a manager!';
    return next(new ErrorResponse(400, message));
  }
  const user = new User(userPayload);
  await user.save();

  const token = user.generateAuthToken();
  const userData = { ...user._doc };
  delete userData.password;

  res.header('x-auth-token', token).json({
    success: true,
    status: 200,
    token,
    user: userData,
  });
});
