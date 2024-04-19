import express from "express";
import type { Request, Response } from "express";
import prisma from "../lib/db";
import { signupSchema } from "../lib/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// REGISTER USER
router.post("/", async (req: Request, res: Response) => {
  try {
    const result = await signupSchema.safeParseAsync(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const { name, email, password } = result.data;

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword },
    });

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// LOGIN USER
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
