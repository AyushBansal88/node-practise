const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
  {
    postId:{
      type:String,
      required:true
    },
    userId:{
      type:String,
      required:true
    }
  },
  {
    timestamps: {createdAt: true, updatedAt: false}
  }
)

module.exports = mongoose.model('like', likeSchema);