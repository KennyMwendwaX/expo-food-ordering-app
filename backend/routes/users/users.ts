import express from "express";
import type { Request, Response } from "express";
import prisma from "../../lib/db";
import { signupSchema } from "../../lib/schema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ users });
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const { name, email, password } = result.data;

    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    if (!newUser) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
