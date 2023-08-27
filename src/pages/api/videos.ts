import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/libs/mongodb";
import Videos from "@/modles/video";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    return handleVideos(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}

async function handleVideos(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
        name,
        href
    } = req.body;

    const videos = await Videos.create({
        name,
        href
    });

    res.status(201).json({ message: "List Created", videos });
  } catch (error) {
    res.status(500).json({ error: "Failed to create list" });
  }
}

async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const videos = await Videos.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "Invalid video ID" });
  }

  try {
    const deletedVideo = await Videos.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ error: "video not found" });
    }

    res.status(200).json({ message: "video deleted successfully", video: deletedVideo });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete video" });
  }
}