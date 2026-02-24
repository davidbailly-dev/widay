const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

        await mongoose.connect(uri, {});

        console.log('Connected to MongoDB successfully !');
    } catch (err) {
        console.log('Error connecting to MongoDB : ', err);
        process.exit();
    }
};

module.exports = connectDB;