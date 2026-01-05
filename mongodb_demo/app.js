const express = require('express');
const app = express();
const userModel = require('./usermodel');

app.get('/', function(req,res){
    res.send('hey')
})

app.get('/create', async function(req, res){
    let createduser = await userModel.create({
        name: "Bansal",
        email: "bansal@gmail.com",
        username: "bansal"
    })
    res.send(createduser);
})

app.get('/read', async function(req, res){
    let user = await userModel.find();
    // let user = await userModel.find({username: 'ayush'});
    // let user = await userModel.findOne({username: 'ayush'});
    res.send(user)
})

app.get('/update', async function(req, res){
    let updateduser = await userModel.findOneAndUpdate({username:"ayush"}, {name:"Ayush Bansal"}, {new:true})
    res.send(updateduser)
})

app.get('/delete', async function(req, res){
    let user = await userModel.findOneAndDelete({username: 'ayush'})
    res.send(user);
})

app.listen(3000)