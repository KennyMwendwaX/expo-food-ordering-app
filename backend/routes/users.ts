import express from "express";
import type { Request, Response } from "express";
import prisma from "../lib/db";
import { signupSchema } from "../lib/schema";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const result = await signupSchema.safeParseAsync(req.body);

    if (!result.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const { name, email, password } = result.data;

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      res.status(409).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword },
    });

    if (!newUser) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
