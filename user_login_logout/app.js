const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring')
const methodOverride = require('method-override');
const authLogin = require('./middlewares/authMiddleware');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

function generateOTP(){
  return randomstring.generate({length: 4, charset: 'numeric'});
}

app.get('/', function(req, res){
  res.render('index')
})

app.post('/create', function(req, res){
  try {
    let {username, email, password, age} = req.body;

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, async function(err, hash){
        let createdUser = await userModel.create({
          username,
          email,
          password: hash,
          age
        })

        let token = jwt.sign({id: createdUser._id}, 'demokey');
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.redirect('/reqotp');    
      })
    })
  } catch (error) {
     return res.status(400).json(error)
  }
})

app.get('/reqotp', function(req, res){
  res.render('requestOtp');
})

app.get('/login', function(req, res){
  res.render('login')
})

app.post('/login', async function(req, res){
  let {email, password} = req.body;
  let user = await userModel.findOne({email})
  const isMatch = await bcrypt.compare(password, user.password)
  if(isMatch){
    let token = jwt.sign({id: user._id}, 'demokey');
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    user.isAuthorized = true;
    await user.save();
    res.redirect('/dashboard')
  }
  else{
      console.log('password does not match');
      res.redirect('/login')
  }       
})

app.put('/verifyotp', async function(req, res){
  try {
    let email = req.body.email;
    await userModel.findOneAndUpdate({email: email}, {otp:generateOTP()}, {new: true});
    res.render('VerifyOtp')

  } catch (error) {
    return res.status(400).json(error)
  }
})

app.post('/verifyotp', async function(req, res){
  try {
    const token = req.cookies.token
    const ans = jwt.verify(token, 'demokey');
    let user = await userModel.findOne({_id: ans.id})
    let otp = req.body.otp; 
    if(user.otp == Number(otp)){
      user.isAuthorized = true;
      await user.save();
      res.redirect('/dashboard')
    }
    res.send('inavalid OTP')
  } catch (error) {
    return res.status(400).json(error)
  }
})

app.get('/dashboard', authLogin,  async function(req, res){
  res.render('dashboard', {name: req.user.username})
})

app.post('/login', async function(req, res){
  let user = await userModel.findOne({email: req.body.email})
  if(!user) return res.send('Email or Password Incorrect..')
  
  bcrypt.compare(req.body.password, user.password, function(err, result){
    if(result){
      let token = jwt.sign({email: user.email}, 'demokey');
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.send('Succesfully login')
    } 
    else res.send('Email or Password Incorrect..')
  })
})

app.get('/logout', async function(req, res){
  const token = req.cookies.token
  const ans = jwt.verify(token, 'demokey');
  let user = await userModel.findOne({_id: ans.id})
  user.isAuthorized = false;
  await user.save();
  res.cookie('token', '');
  res.redirect('/');
})

app.listen(3000, function(err){
  console.log('server listining on port 3000');
})