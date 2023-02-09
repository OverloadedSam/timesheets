const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/*
 * @route   /login
 * @method  POST
 * @access  Public
 * @desc    Login for users.
 */
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = { ...req.body };

  if (!email || !password) {
    const message = 'Email and password both are required!';
    return next(new ErrorResponse(401, message));
  }

  const user = await User.findOne({ email }).populate({
    path: 'role',
    select: 'roleId roleName',
  });

  if (!user)
    return next(new ErrorResponse(404, 'User not found with the given email!'));

  if (!(await user.matchPassword(password)))
    return next(new ErrorResponse(400, 'You entered wrong password'));

  const token = user.generateAuthToken();

  const userData = { ...user._doc };
  delete userData.password;

  res.header('x-auth-token', token).json({
    success: true,
    status: 200,
    token,
    ...userData,
  });
});
