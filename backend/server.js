require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
<<<<<<< HEAD
const db = require("./config/db"); 

const app = express();

=======

const app = express();

/* ===== MIDDLEWARE ===== */
>>>>>>> e6de81cf82702511476c6e5d140007ddf1cf3752
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
// This serves your CSS, Images, and JS files from the public folder
app.use(express.static(path.join(__dirname, "public")));

/* ===== PAGE ROUTES ===== */
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "public", "register.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "public", "admin-dashboard.html")));
app.get("/services", (req, res) => res.sendFile(path.join(__dirname, "public", "services.html")));

/* ===== API ROUTES ===== */
app.use("/users", require("./routes/userRoutes"));

// Admin API to fetch real providers
app.get("/api/admin/providers", (req, res) => {
    db.query("SELECT id, name, email, status FROM users WHERE role = 'provider'", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ LocalEase Server: http://localhost:${PORT}`);
=======
/* ===== FRONTEND ===== */
app.use(express.static(path.join(__dirname, "public")));

/* ===== ROUTES ===== */
app.use("/users", require("./routes/userRoutes"));

/* ===== TEST ===== */
app.get("/", (req, res) => {
  res.send("LocalEase Server Running 🚀");
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
>>>>>>> e6de81cf82702511476c6e5d140007ddf1cf3752
});