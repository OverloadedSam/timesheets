const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const taskSchema = new Schema(
  {
    timesheet: {
      type: ObjectId,
      ref: 'Timesheet',
      required: [true, 'Timesheet is required for this task!'],
    },
    hour: {
      type: Number,
      min: 0,
      max: 23,
      required: [true, 'Please provide hour value'],
    },
    minute: {
      type: Number,
      min: 0,
      max: 59,
      default: 0,
    },
    description: {
      type: String,
      minLength: 2,
      maxLength: 2048,
      trim: true,
      required: [true, 'Description is required!'],
    },
    remarks: {
      type: String,
      minLength: 2,
      maxLength: 2048,
      trim: true,
      required: [true, 'Remarks can not be empty!'],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
