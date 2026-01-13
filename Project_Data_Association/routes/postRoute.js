const express = require('express');
const router = express.Router();
const checkLogin = require("../middleware/checklogin");

const { createPost, likePost, editPost, updatePost } = require('../controller/postController');

router.post('/create', checkLogin, createPost);
router.get('/like/:id', checkLogin, likePost);
router.get('/edit/:id', checkLogin, editPost);
router.post('/update/:id', checkLogin, updatePost);

module.exports = router;