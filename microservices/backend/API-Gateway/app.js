require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');

app.set('view engine', 'ejs');
app.use(cors());
app.use(morgan('dev'));
app.use("/user", proxy(process.env.USER_URL));
app.use("/admin", proxy(process.env.ADMIN_URL));

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(process.env.PORT, function(err){
  console.log(`server is running on port ${process.env.PORT}`);
})