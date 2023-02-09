const manager = async (req, res, next) => {
  if (req.user.role.roleId !== 1) {
    // Manager's ID
    return res.status(403).json({
      success: false,
      status: 403,
      message: 'You must be a manager to perform this task!',
    });
  }

  req.user.isManager = true;
  next();
};

module.exports = manager;
