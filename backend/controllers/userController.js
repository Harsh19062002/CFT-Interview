import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const getUserDetails = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    db.query("SELECT id, firstName, lastName, email FROM users WHERE id = ?", [decoded.id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error fetching user" });
      res.json(result[0]);
    });
  });
};
