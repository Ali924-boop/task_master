import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ message: "Invalid token" });

  try {
    const task = await Task.findOne({ _id: id, user: user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.method === "GET") {
      return res.status(200).json(task);
    }

    if (req.method === "PUT") {
      const { title, description, status } = req.body;
      if (!title || !description || !status)
        return res.status(400).json({ message: "Missing fields" });

      task.title = title;
      task.description = description;
      task.status = status;
      await task.save();

      return res.status(200).json(task);
    }

    if (req.method === "DELETE") {
      await task.deleteOne();
      return res.status(200).json({ message: "Task deleted" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
