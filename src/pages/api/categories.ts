import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Category from "../../modles/categories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handleCategory(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

async function handleCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
        categoryName,
        categorySlug
    } = req.body;

    const category = await Category.create({
        categoryName,
        categorySlug
    });

    res.status(201).json({ message: "Category Created", category });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Category" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Category" });
  }
}
