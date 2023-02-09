const mongoose = require('mongoose');

const isValidObjectId = (id) => {
  return !!mongoose.isValidObjectId(id);
};

module.exports = isValidObjectId;
