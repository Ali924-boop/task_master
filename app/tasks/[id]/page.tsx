"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import SEO from "@/components/Seo";
import TaskCard from "@/components/TaskCard";

type TaskStatus = "pending" | "completed";

type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

const TaskDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (!id) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTask(data);
      } catch {
        setInvalid(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const toggleStatus = async () => {
    if (!task) return;
    const updatedStatus = task.status === "pending" ? "completed" : "pending";
    const res = await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: updatedStatus }),
    });

    if (res.ok) setTask({ ...task, status: updatedStatus });
  };

  const deleteTask = async () => {
    if (!task) return;
    const res = await fetch(`/api/tasks/${task._id}`, { method: "DELETE" });
    if (res.ok) router.push("/home");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading task...
      </div>
    );

  if (invalid || !task)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Task not found
      </div>
    );

  return (
    <ProtectedRoute>
      <SEO title={`TaskMaster | ${task.title}`} description={task.description} />
      <main className="min-h-screen pt-28 bg-gray-50 dark:bg-gray-900 flex justify-center px-4">
        <div className="w-full max-w-2xl mb-14">
          <TaskCard
            title={task.title}
            description={task.description}
            status={task.status}
            onStatusChange={toggleStatus}
            onDelete={deleteTask}
          />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default TaskDetailPage;
