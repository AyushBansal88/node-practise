const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get('/', function(req, res){
    res.cookie("name", "ayush");
    res.send('message from server');
})

app.get('/read', function(req,res){
    console.log(req.cookies);
    res.send('response from read')
})

app.get('/encrypt', function(req, res){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash("ayush", salt, function(err, hash){
            console.log(hash);
        })
    })
    res.send('msg from encrypt')
})

app.get('/decrypt', function(req, res){
    bcrypt.compare('ayush', '$2b$10$k9iQZ3RkbrjlFIqKhbcNPuiMLTVIQfSBgGKG4SDRyBJgfjjsME9GW', function(err, resut){
        console.log(resut);
    })
    res.send('msg from decrypt')
})

app.get('/jwt', function(req, res){
    let token = jwt.sign({email: 'ayush@gmail.com'}, 'secret')
    res.cookie('token', token)
    res.send("msg form jwt")
})

app.get('/readjwt', function(req, res){
    let data = jwt.verify(req.cookies.token, 'secret');
    console.log(data);
    res.send('jwt readed')
})

app.listen(3000, function(err){
    console.log('listining on port 3000');
});