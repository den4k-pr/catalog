import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Links from "@/modles/links";

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
  const { id } = req.query;

  try {
    const link = await Links.findOne({ _id: id });

    if (!link) {
      return res.status(404).json({ error: "Список не знайдено" });
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати список" });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const { newName, newHref } = req.body;

  try {
    const link = await Links.findOne({ _id: id });

    if (!link) {
      return res.status(404).json({ error: "Список не знайдено" });
    }

    link.name = newName;
    link.href = newHref;
    await link.save();

    return res.json({ message: "Список оновлено" });
  } catch (error) {
    console.error("Помилка при оновленні списку:", error);
    return res.status(500).json({ error: "Не вдалося оновити список" });
  }
}
