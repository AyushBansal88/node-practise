const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const {login, signup, createadmin, profile, validateLogin, logOut} = require('../controller/admin.controller')

router.get('/', login);
router.get('/signup', signup);
router.post('/createadmin', createadmin);
router.get('/profile', authenticate, profile);
router.post('/login', validateLogin);
router.get('/logout', logOut);

module.exports = router;