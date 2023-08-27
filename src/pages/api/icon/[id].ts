import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Icons from "@/modles/icons";

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
    const icons = await Icons.findOne({ _id: id });

    if (!icons) {
      return res.status(404).json({ error: "Контакт не знайдено" });
    }

    res.json(icons);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати Контакт" });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const { newName, newHref } = req.body;

  try {
    const icons = await Icons.findOne({ _id: id });

    if (!icons) {
      return res.status(404).json({ error: "Контакт не знайдено" });
    }

    icons.name = newName;
    icons.href = newHref;
    await icons.save();

    return res.json({ message: "Контакт оновлено" });
  } catch (error) {
    console.error("Помилка при оновленні списку:", error);
    return res.status(500).json({ error: "Не вдалося оновити Контакт" });
  }
}
