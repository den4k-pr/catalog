import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Icons from "@/modles/icons";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handleIcons(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  res.status(405).json({ error: "Метод не дозволено" });
}

async function handleIcons(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, href } = req.body;

    const icons = await Icons.create({
      name,
      href
    });

    res.status(201).json({ message: "Список створено", icons });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося створити список" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const icons = await Icons.find();
    res.json(icons);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати значки" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Недійсний ID" });
  }

  try {
    const deletedIcons = await Icons.findByIdAndDelete(id);

    if (!deletedIcons) {
      return res.status(404).json({ error: "Значки не знайдено" });
    }

    res.status(200).json({ message: "Значки успішно видалено", icons: deletedIcons });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося видалити значки" });
  }
}
