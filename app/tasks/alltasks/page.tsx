"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import SEO from "@/components/Seo";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
};

const AllTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const res = await fetch("/api/tasks", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        setTasks(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  return (
    <ProtectedRoute>
      <SEO title="All Tasks - TaskMaster" description="View all your tasks" />
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          All Tasks
        </h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-300 text-center">Loading tasks...</p>
        )}

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!loading && tasks.length === 0 && (
          <p className="text-gray-500 dark:text-gray-300 text-center">No tasks found.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => handleCardClick(task._id)}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{task.title}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  }`}
                >
                  {task.status.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Created at: {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AllTasksPage;
