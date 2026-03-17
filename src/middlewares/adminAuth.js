import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mySecretKey";

export const adminAuth = (req, res, next) => {
  next();
  return
  const token = req.headers["admin-auth-token"];
  if (!token) {
    res
      .status(401)
      .json({ message: "Authorization Admin token missing or malformed" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
