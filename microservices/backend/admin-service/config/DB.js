const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`DB Connected to ${process.env.MONGO_URL}`);
    } catch (error) {
        console.log('DB Connection failed', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;