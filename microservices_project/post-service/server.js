require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/postDB');
const postRouter = require('./routes/post.routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', postRouter);

async function startServer() {
  try {
    await connectDB();
    app.listen(process.env.PORT, (err) => {
      console.log(`post service is running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer()