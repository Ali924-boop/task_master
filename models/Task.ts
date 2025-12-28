// models/Task.ts
import mongoose, { Schema, model, models } from "mongoose";

export type Status = "pending" | "completed";

interface ITask {
  title: string;
  description: string;
  status: Status;
  user: mongoose.Schema.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Task = models.Task || model<ITask>("Task", TaskSchema);
export default Task;
