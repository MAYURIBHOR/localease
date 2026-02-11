require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
});