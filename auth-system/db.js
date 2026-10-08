const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1); // Stop the server if database connection fails
    }
};

module.exports = connectDB