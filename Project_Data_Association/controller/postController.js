const userModel = require('../models/user');
const postModel = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let user = await userModel.findOne({ _id: req.user.id });
    let post = await postModel.create({
    content,
    user: user.id,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({
    success: false,
    message:error.message
    })
  }
}

exports.likePost = async (req, res) => {
  try {
    let post = await postModel.findOne({_id:req.params.id}).populate('user');
    if(post.like.indexOf(req.user._id) === -1){
      post.like.push(req.user._id);
    }
    else{
      post.like.splice(post.like.indexOf(req.user._id), 1);
    }
    await post.save();
    res.redirect('/profile')

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.editPost = async (req, res) => {
  try {
    let post = await postModel.findOne({_id:req.params.id}).populate('user');
    res.render('edit', {post})
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.updatePost = async (req, res) => {
  try {
    let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content: req.body.content});
    res.redirect('/profile');
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  } 
}