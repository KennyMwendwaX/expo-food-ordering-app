import express from "express";
import type { Request, Response } from "express";
import prisma from "../lib/db";
import { productSchema } from "../lib/schema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const priceValue = parseFloat(req.body.price);
    const data = { ...req.body, price: priceValue };

    const result = await productSchema.safeParseAsync(data);

    if (!result.success) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const { name, price, imageUrl } = result.data;

    const newProduct = await prisma.product.create({
      data: { name: name, price: price, imageUrl: imageUrl },
    });

    if (!newProduct) {
      return res.status(500).json({ message: "Failed to create product" });
    }

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const priceValue = parseFloat(req.body.price);
    const data = { ...req.body, price: priceValue };

    const result = await productSchema.safeParseAsync(data);

    if (!result.success) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const { name, price, imageUrl } = result.data;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name: name, price: price, imageUrl: imageUrl },
    });

    if (!updatedProduct) {
      return res.status(500).json({ message: "Failed to update product" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    if (!deletedProduct) {
      return res.status(500).json({ message: "Failed to delete product" });
    }

    return res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
