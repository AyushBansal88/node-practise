function authLogin(req, res, next){
  if(req.cookies.token !== ''){
    return next();
  }
  else{
    res.redirect('/')
  }
}

module.exports = authLogin;