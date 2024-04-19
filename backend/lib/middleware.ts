import { RequestHandler } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  name: string;
  role: string;
}

interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authenticate: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded as UserPayload;
    next();
  });
};
