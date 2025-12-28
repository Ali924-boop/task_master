import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please provide email and password" });

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id, email: user.email });

    res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email } });
  } catch (err: unknown) {
    res.status(500).json({ message: err instanceof Error ? err.message : "Something went wrong" });
  }
}
