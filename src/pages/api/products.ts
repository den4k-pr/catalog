import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Product from "../../modles/products";
import shortid from 'shortid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handlePost(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      name,
      description,
      price,
      sale,
      slug,
      category,
      categorySlug,
      images,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      sale,
      slug,
      category,
      categorySlug,
      images,
    });

    res.status(201).json({ message: "Product Created", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Product" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Product" });
  }
}
