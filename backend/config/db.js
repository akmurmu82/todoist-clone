const mongoose = require("mongoose");

const connectDB = async (mongo_uri) => {
    try {
        await mongoose.connect(mongo_uri);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
