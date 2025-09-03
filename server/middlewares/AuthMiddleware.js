import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // ✅ verify token using your secret
    const payload = jwt.verify(token, process.env.JWT_KEY);

    // ✅ attach userId directly for consistency
    req.userId = payload.userId;  
    req.email = payload.email;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(400).json({ error: "Invalid token." });
  }
};
