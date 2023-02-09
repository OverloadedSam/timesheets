const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const isValidObjectId = require('../utils/validateObjectId');

// Verify uuids coming in request parameters.
const verifyId = (idToVerify) => (req, res, next) => {
  const id = req.params[idToVerify];

  if (!isValidObjectId(id))
    return next(new ErrorResponse(400, `"${id}" is not a valid id!`));

  next(); // Call the next middleware if id is valid.
};

module.exports = verifyId;
