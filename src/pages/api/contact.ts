import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Contact from "../../modles/contact";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handleContact(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

async function handleContact(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
        name
    } = req.body;

    const contact = await Contact.create({
        name
    });

    res.status(201).json({ message: "Contact Created", contact });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Contact" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await Contact.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Invalid Contact ID" });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully", Contact: deletedContact });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Contact" });
  }
}
