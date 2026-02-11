const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ msg: err });

      if (results.length === 0) {
        return res.status(401).json({ msg: "User not found" });
      }

      const user = results[0];

      // IMPORTANT PART
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password" });
      }

      res.json({ msg: "Login successful", user });
    }
  );
};