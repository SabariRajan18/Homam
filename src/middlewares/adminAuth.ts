import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mySecretKey";

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const adminAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {

  const token = req.cookies.adminToken;
  if (!token) {
    res.status(401).json({ message: "Authorization Admin token missing or malformed" });
    return;
  };

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};