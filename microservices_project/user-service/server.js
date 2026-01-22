require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/userDB');
const morgan = require('morgan');
const cors = require('cors');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

async function startServer() {
  try {
    await connectDB();
    app.listen(process.env.PORT, (err) => {
      console.log(`user service is running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer()