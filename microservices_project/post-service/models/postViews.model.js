const mongoose = require('mongoose');

const postViewsSchema = mongoose.Schema(
  {
    postId:{
      type:String,
      required:true
    },
    userId:{
      type:String,
    },
    ipAddress:{
      type:String,
      required:true
    },
    viewedAt:{
      type:Date,
      default:Date.now
    }
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('postView', postViewsSchema);