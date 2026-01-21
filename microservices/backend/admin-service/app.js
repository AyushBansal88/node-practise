require("dotenv").config();
const cors = require('cors');
const express = require("express");
const app = express();
const connectDB = require('./config/DB')
const adminRoutes = require('./routes/admin.routes');
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', adminRoutes);

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