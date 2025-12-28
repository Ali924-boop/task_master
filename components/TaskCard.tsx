import { FiCheckCircle, FiClock, FiTrash2 } from "react-icons/fi";

export interface TaskCardProps {
  title: string;
  description: string;
  status: "pending" | "completed";
  onStatusChange: () => void;
  onDelete: () => void;
}

const TaskCard = ({
  title,
  description,
  status,
  onStatusChange,
  onDelete,
}: TaskCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete Task"
        >
          <FiTrash2 />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onStatusChange}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium capitalize transition ${
            status === "completed"
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
          }`}
        >
          {status === "completed" ? <FiCheckCircle /> : <FiClock />}
          {status}
        </button>

        <span className="text-xs text-gray-400">
          Click status to toggle
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
