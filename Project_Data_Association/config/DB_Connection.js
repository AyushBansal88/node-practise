const mongoose = require('mongoose');

async function connectDB(){
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Project_1");
    console.log('MongoDB Connected')    
  } catch (error) {
    console.error('DB Connection Failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;