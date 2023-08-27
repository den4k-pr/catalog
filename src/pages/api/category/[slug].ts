// api/category/[slug].ts

import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Category from "@/modles/categories";

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
    const category = await Category.findOne({ categorySlug: slug });

    if (!category) {
      return res.status(404).json({ error: "Категорія не знайдена" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати категорію" });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const { newCategoryName, newCategorySlug } = req.body;

  try {
    await connectMongoDB();
    const category = await Category.findOne({ categorySlug: slug });

    if (!category) {
      return res.status(404).json({ error: "Категорія не знайдена" });
    }

    category.categoryName = newCategoryName;
    category.categorySlug = newCategorySlug;
    await category.save();

    return res.json({ message: "Категорію оновлено" });
  } catch (error) {
    console.error("Помилка при оновленні категорії:", error);
    return res.status(500).json({ error: "Не вдалося оновити категорію" });
  }
}
