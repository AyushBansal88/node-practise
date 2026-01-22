const mongoose = require('mongoose');

async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connected to ${process.env.MONGO_URL}`);
  } catch (error) {
    console.log('DB connection failed', error.message);
    process.exit(1);
  }   
}

module.exports = connectDB;