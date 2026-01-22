const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema(
  {
    userID:{
      type:String,
      required:true,
    },
    token:{
      type:String,
      required:true,
      unique:true
    },
    expiresAt:{
      type:Date,
      required:true
    }
  },
  {
    timestamps: {createdAt: true, updatedAt: false}
  }
)

module.exports = mongoose.model('refreshToken', refreshTokenSchema);