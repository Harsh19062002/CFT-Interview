import express from "express";
import { getUserDetails } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Import middleware

const router = express.Router();

// ✅ Secure route: Only accessible with a valid JWT
router.get("/me", verifyToken, getUserDetails);

export default router;
