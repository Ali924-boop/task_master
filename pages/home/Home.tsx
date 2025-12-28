"use client";

import React, { useState } from "react";
import TaskCard from "@/components/TaskCard";
import SEO from "@/components/Seo";

type Task = {
  title: string;
  description: string;
  status: "pending" | "completed";
};

const initialTasks: Task[] = [
  {
    title: "Finish Project",
    description: "Complete TaskMaster fullstack app",
    status: "pending",
  },
  {
    title: "Deploy App",
    description: "Deploy TaskMaster to Vercel",
    status: "completed",
  },
  {
    title: "Write Documentation",
    description: "Prepare README and guides",
    status: "pending",
  },
];

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // ✅ Toggle Status
  const toggleStatus = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  // ✅ DELETE TASK (MISSING PART)
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <SEO title="TaskMaster" description="Manage tasks easily" />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 px-6">
        <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, idx) => (
            <TaskCard
              key={idx}
              title={task.title}
              description={task.description}
              status={task.status}
              onStatusChange={() => toggleStatus(idx)}
              onDelete={() => deleteTask(idx)}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
