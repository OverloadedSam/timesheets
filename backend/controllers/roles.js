const Role = require('../models/role');
const asyncHandler = require('../middlewares/asyncHandler');

/*
 * @route   /role
 * @method  POST
 * @access  Admin
 * @desc    Create a user role in the DB.
 */
module.exports.createRole = asyncHandler(async (req, res, next) => {
  const rolePayload = { ...req.body };

  const role = new Role(rolePayload);
  await role.save();

  res.json({
    status: 201,
    message: 'The role has been created',
    role,
  });
});
