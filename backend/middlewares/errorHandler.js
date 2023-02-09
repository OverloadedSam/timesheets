const ErrorResponse = require('../utils/errorResponse.js');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose error for duplicate field value.
  if (error.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[Object.keys(err.keyPattern)];

    let message = `A field value already exists. Field: "${key}", Value: "${value}"`;
    if (key === 'email') message = `${value} is already registered!`;
    error = new ErrorResponse(400, message);
  }

  // Mongoose error for validation of data.
  if (err.name === 'ValidationError') {
    let message = Object.values(err.errors)[0].message;
    if (!message) message = error.message;
    error = new ErrorResponse(400, message);
  }

  // Mongoose error for failed to cast invalid ObjectIds.
  if (err.name === 'CastError') {
    const message = `${error.message}. ${err.reason}`;
    error = new ErrorResponse(400, message);
  }

  const status = error.statusCode || 500;
  const message =
    error.message || 'Unexpected error occurred! Internal server error!';

  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = errorHandler;
