import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createUser, findUserByEmail, setResetToken, findUserByResetToken, updateUserPassword } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (result.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    createUser({ firstName, lastName, email, password: hashedPassword }, (err) => {
      if (err) return res.status(500).json({ message: "Error registering user" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({ message: "Login successful", token });
  });
};

export const forgotPassword = (req, res) => {
  const { email } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (result.length === 0)
      return res.status(404).json({ message: "Email not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    setResetToken(email, resetToken, expiry, async (err) => {
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      await sendEmail(
        email,
        "Password Reset Link",
        `<p>Click the link below to reset your password. Valid for 5 minutes.</p>
         <a href="${resetLink}">${resetLink}</a>`
      );
      res.json({ message: "Reset link sent to your email." });
    });
  });
};

export const resetPassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  findUserByResetToken(token, async (err, result) => {
    if (result.length === 0)
      return res.status(400).json({ message: "Invalid token" });

    const user = result[0];
    if (new Date() > user.resetTokenExpiry)
      return res.status(400).json({ message: "Token expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateUserPassword(user.email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Error updating password" });
      res.json({ message: "Password reset successful" });
    });
  });
};
