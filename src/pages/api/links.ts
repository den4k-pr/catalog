import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Links from "@/modles/links";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handleLinks(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

async function handleLinks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
        name,
        href
    } = req.body;

    const links = await Links.create({
        name,
        href
    });

    res.status(201).json({ message: "List Created", links });
  } catch (error) {
    res.status(500).json({ error: "Failed to create list" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const links = await Links.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Invalid link ID" });
  }

  try {
    const deletedLink = await Links.findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully", link: deletedLink });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete link" });
  }
}