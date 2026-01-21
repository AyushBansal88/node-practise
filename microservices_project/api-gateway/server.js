require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const userProxy = require('./routes/user.proxy');
const postProxy = require('./routes/post.proxy');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

userProxy(app);
postProxy(app);

app.get('/', (req, res)=> {
  res.send('hi');
})

app.listen(process.env.PORT, () => {
  console.log(`Api gateway service is running on port ${process.env.PORT}`);
});
