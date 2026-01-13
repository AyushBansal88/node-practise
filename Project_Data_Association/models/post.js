const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  content:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  date:{
    type:Date,
    default:Date.now
  },
  like:Array
})

module.exports = mongoose.model('post', postSchema);