
import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Product from "../../../modles/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "PUT") {
    return handlePut(req, res);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  try {
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
}


async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const { newName, newImages, newDescription, newPrice, newSlug, newCategory, newCategorySlug } = await req.body;

  try {
    await connectMongoDB();
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updates = {
      name: newName,
      images: newImages,
      description: newDescription,
      price: newPrice,
      slug: newSlug,
      category: newCategory,
      categorySlug: newCategorySlug,
    };

    await product.updateOne(updates);

    return res.json({ message: "Product updated" });
  } catch (error) {
    console.error("Помилка при оновленні товару:", error);
    return res.status(500).json({ error: "Failed to update product" });
  }
}
