// ********* fs module in node ******

// const fs = require('fs');

// fs.writeFile("test.txt","this is demo text" ,function(err){
//     if(err) console.log(err);
//     else console.log("done file created");
// })

// fs.appendFile("test.txt"," this is another text",function(err){
//     if(err) console.log(err);
//     else console.log("done append");
// })

// fs.rename("test.txt","hey.txt",function(err){
//     if(err) console.log(err);
//     else console.log("done rename");
// })

// fs.copyFile("hey.txt","./copy/copy.txt",function(err){
//     if(err) console.log(err);
//     else console.log("done copy file");
// })

// fs.unlink("hey.txt",function(err){
//     if(err) console.log(err);
//     else console.log("done file removed");
// })


// const http = require('http');

// const server = http.createServer(function(req,res){
//     res.end("hello world");
// })

// server.listen(3000);


const express = require('express');
const app = express();

// used to make data readable from frontend
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// middelware code
app.use(function(req,res,next){
    console.log('middelware');
    next();
})

// route code
app.get('/', function(req,res){
    res.send('hello world')
})

app.get('/route',function(req,res,next){
    res.send('this is route')
    // return next(new Error('something'));
})

// error handler
// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.status(500).send('Something broke!')
// })

app.listen(3000);