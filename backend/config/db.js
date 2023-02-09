const mongoose = require('mongoose');

const connectDB = async () => {
  const URI = process.env.DB_CONNECTION_STRING;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  };

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(URI, options);
    console.log('SUCCESSFULLY CONNECTED TO DATABASE');
  } catch (error) {
    console.log('CONNECTION TO DATABASE FAILED!', error);
  }
};

module.exports = connectDB;
