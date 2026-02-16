require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection (Using Local URI from your .env)
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LocalEase';
mongoose.connect(mongoUri)
    .then(() => console.log("✅ Connected to MongoDB!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

/* ===== PAGE ROUTES ===== */
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "public", "register.html")));

/* ===== API ROUTES ===== */
// This prefix "/api/users" is why your frontend needs /api/users/login
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 LocalEase Server: http://localhost:${PORT}`);
});