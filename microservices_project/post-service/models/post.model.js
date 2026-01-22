const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    userId:{
      type:String,
      required:true,
      index:true
    },
    title:{
      type:String,
      required:true,
      trim:true,
      maxlength:200
    },
    content:{
      type:String,
      required:true,
      trim:true
    },
    mediaUrl:{
      type:String,
      trim:true
    },
    isPublished:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('post', postSchema);