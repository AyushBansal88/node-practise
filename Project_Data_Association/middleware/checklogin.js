const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

async function checkLogin(req, res, next){
  const token = req.cookies.token;
  if(token == ''){
    res.redirect('/login');
  }
  const data = jwt.verify(token, 'secretkey');
  const user = await userModel.findOne({_id:data.id});
  if(user != null){
    req.user = user;
    return next();
  }
  res.redirect('/login')
}

module.exports = checkLogin;