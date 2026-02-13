const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We will put your Cloud URL here later
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;