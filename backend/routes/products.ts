import express from "express";
import type { Request, Response } from "express";
import prisma from "../lib/db";
import { productSchema } from "../lib/schema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const { name, price, imageUrl } = result.data;

    const newProduct = await prisma.product.create({
      data: { name: name, price: Number(price), imageUrl: imageUrl },
    });

    if (!newProduct) {
      res.status(500).json({ message: "Failed to create product" });
      return;
    }

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
