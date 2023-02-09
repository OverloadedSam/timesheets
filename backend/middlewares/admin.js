const admin = async (req, res, next) => {
  if (req.user.role.roleId !== 0) {
    // Admin's ID
    return res.status(403).json({
      success: false,
      status: 403,
      message: 'You must be an admin to perform this task!',
    });
  }

  req.user.isAdmin = true;
  next();
};

module.exports = admin;
