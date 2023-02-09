const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 64,
      trim: true,
      required: [true, 'Name can not be empty!'],
    },
    email: {
      type: String,
      minLength: 2,
      maxLength: 256,
      trim: true,
      required: [true, 'email can not be empty!'],
      unique: true,
    },
    role: {
      type: ObjectId,
      ref: 'Role',
      required: [true, 'Role is required!'],
    },
    reportsTo: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },
    password: {
      type: String,
      maxLength: 256,
      required: [true, 'Password is required!'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const SALT = process.env.SALT;

  const salt = await bcryptjs.genSalt(parseInt(SALT));
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const SECRET = process.env.SECRET;
  const payload = {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role.roleId,
  };

  const token = jwt.sign(payload, SECRET);

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
