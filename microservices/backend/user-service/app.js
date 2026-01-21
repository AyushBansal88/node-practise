require('dotenv').config();
const cors = require('cors');
const morgan = require("morgan");
const express = require('express');
const connectDB = require('./config/DB');
const app = express();
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', userRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(process.env.PORT, (err) => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();