import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const getUserDetails = (req, res) => {
  const authHeader = req.headers.authorization;

  // ✅ Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user details from DB
    db.query(
      "SELECT id, firstName, lastName, email FROM users WHERE id = ?",
      [decoded.id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Error fetching user details" });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        // ✅ Return user info
        return res.status(200).json({
          success: true,
          user: result[0],
        });
      }
    );
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
