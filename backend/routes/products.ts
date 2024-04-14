import express from "express";
import type { Request, Response } from "express";
import prisma from "../lib/db";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.status(200).json({ products });
});

// router.post("/", async(req: Request, res: Response)=> {
//     try {
// const
//     } catch (error) {

//     }
// })
