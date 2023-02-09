const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    roleId: {
      type: Number,
      enum: [0, 1, 2],
      required: [true, 'Role id is required'],
    },
    roleName: {
      type: String,
      maxLength: 64,
      trim: true,
      required: [true, 'Role name or description is required!'],
    },
  },
  { timestamps: true }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
