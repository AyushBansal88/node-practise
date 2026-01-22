const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,   
      unique: true,
      trim:true
    },
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model('User', userSchema);