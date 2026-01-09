const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

async function authLogin(req, res, next){
    const token = req.cookies.token
    if(token == ''){
        res.redirect('/')
    }
    const ans = jwt.verify(token, 'demokey');
    let user = await userModel.findOne({_id: ans.id})
    if(user != null){
        if (user.isAuthorized === true) {
            req.user = user;
            return next();
        } else {
        res.redirect('/');
        }
    } else {
        res.redirect('/')
    } 
}

module.exports = authLogin;