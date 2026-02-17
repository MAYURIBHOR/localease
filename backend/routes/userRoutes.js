const express = require('express');
const router = express.Router();
const User = require('../models/user');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server error during registration", error: err.message });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Find user by email and role
        const foundUser = await User.findOne({ email, role });

        // Simple password check
        if (!foundUser || foundUser.password !== password) {
            return res.status(401).json({ message: "Invalid email, password, or role" });
        }

        res.status(200).json({ 
            message: "Login successful", 
            token: "local-dev-token", 
            user: { role: foundUser.role } 
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login", error: err.message });
    }
});

module.exports = router;
