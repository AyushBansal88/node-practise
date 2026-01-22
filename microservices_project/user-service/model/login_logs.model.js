const mongoose = require('mongoose');

const loginLogsSchema = mongoose.Schema(
  {
    userId:{
      type:String,
      required:true
    },
    ipAddress:{
      type:String,
      required:true
    },
    device:String,
    loggedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('loginLogs', loginLogsSchema);