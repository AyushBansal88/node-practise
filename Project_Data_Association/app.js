require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/DB_Connection');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/", userRoute);
app.use("/post", postRoute);

async function startServer(){
  try {
    await connectDB();
    app.listen(process.env.PORT, function (err) {
      console.log(`server listining on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();