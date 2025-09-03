import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

// ✅ CORS setup
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173", // fallback for dev
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server
const server = app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

// ✅ DB connection
mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB Connection Successful"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });
