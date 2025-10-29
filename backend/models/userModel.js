import { db } from "../config/db.js";

export const createUser = (userData, callback) => {
  const { firstName, lastName, email, password } = userData;
  db.query(
    "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, password],
    callback
  );
};

export const findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

export const findUserByResetToken = (token, callback) => {
  db.query("SELECT * FROM users WHERE resetToken = ?", [token], callback);
};

export const updateUserPassword = (email, hashedPassword, callback) => {
  db.query("UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE email = ?", [hashedPassword, email], callback);
};

export const setResetToken = (email, token, expiry, callback) => {
  db.query("UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?", [token, expiry, email], callback);
};
