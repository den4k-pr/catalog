import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Logo from "@/modles/logo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handlePost(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  }

  res.status(405).json({ error: "Метод не дозволено" });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { href } = req.body;

    const logo = await Logo.create({
      href
    });

    res.status(201).json({ message: "Список створено", logo });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося створити список" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const logo = await Logo.find();
    res.json(logo);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати значки" });
  }
}
