const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

app.use('/login', authRoute);
app.use('/createUser', userRoute);

module.exports = app;                                     