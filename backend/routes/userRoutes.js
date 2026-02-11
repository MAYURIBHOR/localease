const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ================= REGISTER ================= */
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check email already exists
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length > 0) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Insert user
      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role],
        (err) => {
          if (err)
            return res.status(500).json({ message: "Registration failed" });

          res.status(201).json({
            message: "Registration successful",
          });
        }
      );
    }
  );
});

/* ================= LOGIN ================= */
router.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ? AND role = ?",
    [email, password, role],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        message: "Login successful",
        user: result[0],
      });
    }
  );
});

module.exports = router;