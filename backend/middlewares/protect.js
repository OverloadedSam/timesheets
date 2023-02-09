const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  let token;
  const key = process.env.SECRET;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    const message = 'No authorization token was found in the request';
    return next(new ErrorResponse(404, message));
  }

  try {
    const payload = jwt.verify(token, key);

    let user = await User.findById(payload.id).populate('role');

    if (!user) {
      const message = 'You are not logged in as a valid user. Login again.';
      return next(new ErrorResponse(401, message));
    }

    req.user = user;
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = auth;
