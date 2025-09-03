import { Router } from "express";
import { login, signup, getUserInfo, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

// ✅ Auth routes
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

// ✅ Protected routes
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.put("/update-profile", verifyToken, updateProfile);

export default authRoutes;


