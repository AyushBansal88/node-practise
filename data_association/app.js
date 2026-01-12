const express = require('express');
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', function(req, res){
    res.send('server working');
})

app.get('/createuser', async function(req, res){
    let user = await userModel.create({
        usernmae: 'ayush',
        email: 'ayush0588@gmail.com',
        age: 24
    })
    res.send(user);
})

app.get('/createpost', async function(req, res){
    let post = await postModel.create({
      postdata: "this is dummy post data",
      user: "69648917c3c80361ef069cbb",
    });

    let user = await userModel.findOne({ _id: "69648917c3c80361ef069cbb" });
    user.posts.push(post._id);
    await user.save();

    res.send({post, user});
})

app.listen(3500, function(err){
    console.log("server listining on port 3500");
})