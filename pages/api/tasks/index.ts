import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ message: "Invalid token" });

  try {
    if (req.method === "GET") {
      const tasks = await Task.find({ user: user.id }).sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    }

    if (req.method === "POST") {
      const { title, description } = req.body;
      if (!title || !description) return res.status(400).json({ message: "Missing fields" });

      const newTask = await Task.create({
        title,
        description,
        status: "pending",
        user: user.id,
      });
      return res.status(201).json(newTask);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
