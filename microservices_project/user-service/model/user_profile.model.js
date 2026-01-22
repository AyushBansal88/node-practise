const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema(
  {
    userId:{
      type:String,
      required:true,
      unique:true
    },
    bio:String,
    profileImage:String,
    dateOfBirth:Date,
    gender:{
      type:String,
      enum: ["male", "female", "other"]
    }
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model('userProfile', userProfileSchema);