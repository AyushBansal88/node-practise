const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const checkLogin = require('./middleware/checklogin');
const user = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', function(req, res){
  try {
    res.render("index");  
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
});

app.post('/signup', async function(req, res){
  try {
    const {name, username, email, password} = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
      success: false,
      message: "All feilds are required",
      });
    }
    let checkuser = await userModel.findOne({email});
    if(checkuser != null){
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, async function(err, hash){
        let user = await userModel.create({
          name,
          username,
          email,
          password: hash
        })
        let token = jwt.sign({ id: user._id }, "secretkey");
        res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.redirect('/profile');
      })
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    });
  }
});

app.get('/login', function(req, res){
  try {
    res.render('login')
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
});

app.post('/login', async function(req, res){
  try {
    const {email, password} = req.body;
    let user = await userModel.findOne({email});
    console.log(user);
    if(user){
     const check = await bcrypt.compare(password, user.password);
     if(check){
      const token = jwt.sign({id: user._id}, "secretkey");
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect('/profile');
     }
    }
    res.send('something went wrong')
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
});

app.get('/profile', checkLogin, async function(req, res){
  try {
    const user = await userModel.findOne({_id:req.user.id}).populate('posts')
    res.render('profile', {user});
  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }
});

app.post("/create/post", checkLogin, async function(req, res){
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
});

app.get('/logout', function(req, res){
  try {
    res.cookie("token", "");
    res.redirect("/"); 
  } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }
});

app.get('/like/post/:id', checkLogin, async function(req, res){
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
});

app.get('/edit/post/:id', checkLogin, async function(req, res){
  try {
    let post = await postModel.findOne({_id:req.params.id}).populate('user');
    res.render('edit', {post})
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
});

app.post('/update/post/:id', checkLogin, async function(req, res){
  try {
    let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content: req.body.content});
    res.redirect('/profile');
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  } 
});

app.listen(3000, function(err){
  console.log('server listining on port 3000');
});