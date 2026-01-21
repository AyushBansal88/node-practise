const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const { signup, createuser, profile, logOut, login, validateLogin } = require("../controller/user.controller");

router.get('/signup', signup);
router.post('/createuser', createuser);
router.get('/profile', authenticate, profile);
router.get('/logout', logOut);
router.get('/', login);
router.post("/login", validateLogin);

module.exports = router;