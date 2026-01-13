const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checklogin');

const { home, signUp, login, validateLogin, profile, logOut } = require('../controller/userController');

router.get('/', home);
router.post('/signup', signUp);
router.get('/login', login);
router.post('/login', validateLogin);
router.get('/profile',  checkLogin, profile);
router.get('/logout', logOut);

module.exports = router;