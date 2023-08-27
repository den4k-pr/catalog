import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Logo from "@/modles/logo";

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
    const logo = await Logo.findOne({ _id: id });

    if (!logo) {
      return res.status(404).json({ error: "Контакт не знайдено" });
    }

    res.json(logo);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати Контакт" });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const { newHref } = req.body;

  try {
    const logo = await Logo.findOne({ _id: id });

    if (!Logo) {
      return res.status(404).json({ error: "Контакт не знайдено" });
    }

    logo.href = newHref;
    await logo.save();

    return res.json({ message: "Контакт оновлено" });
  } catch (error) {
    console.error("Помилка при оновленні списку:", error);
    return res.status(500).json({ error: "Не вдалося оновити Контакт" });
  }
}
