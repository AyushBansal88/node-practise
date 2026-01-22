const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    postId:{
      type:String,
      required:true
    },
    userId:{
      type:String,
      required:true
    },
    comment:{
      type:String,
      required:true,
      maxlength:1000
    }
  },
  {
    timestamps: {createdAt: true, updatedAt: false}
  }
)

module.exports = mongoose.model('comment', commentSchema);