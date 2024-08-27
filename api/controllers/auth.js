import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields (username, email, password) are required" });
  }

  // Check if user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(checkUserQuery, [email, username], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password and insert the new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const insertUserQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertUserQuery, [username, email, hash], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.status(201).json({ message: "User has been created" });
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
