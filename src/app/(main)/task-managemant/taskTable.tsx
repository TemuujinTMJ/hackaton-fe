import { Edit, Pen, Trash } from "lucide-react";
import React from "react";
interface TaskProps {
  _id: string;
  title: string;
  description: string;
  priority: number;
  type: "urgent" | "normal" | "onboarding";
  isActive: string;
  createdBy: string;
  workingDays: string;
  createdAt: string;
  updatedAt: string;
}
interface TaskTableProps {
  tasks: TaskProps[];
  onDelete: (taskId: string) => void;
  onEdit?: (task: TaskProps) => void;
}

export default function TaskTable({ tasks, onDelete, onEdit }: TaskTableProps) {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "text-red-500 bg-red-50";
      case 2:
        return "text-yellow-500 bg-yellow-50";
      case 3:
        return "text-green-500 bg-green-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1:
        return "Яаралтай";
      case 2:
        return "Дундаж";
      case 3:
        return "Энгийн";
      default:
        return "Тодорхойгүй";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto border rounded-2xl border-zinc-500 mb-10">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase border-b border-zinc-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Даалгаврын нэр
            </th>
            <th scope="col" className="px-6 py-4">
              Төрөл
            </th>
            <th scope="col" className="px-6 py-4">
              Тэргүүлэх
            </th>
            <th scope="col" className="px-6 py-4">
              Ажлын өдөр
            </th>
            <th scope="col" className="px-6 py-4">
              Огноо
            </th>
            <th scope="col" className="px-6 py-4">
              Төлөв
            </th>
            <th scope="col" className="px-6 py-4">
              Үйлдэл
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-500">
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="px-6 py-4 font-medium text-white w-[500px]">
                <div>
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {task.description}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-white w-[150px]">
                <span className="px-2 py-1 rounded-full text-xs bg-[#2d2d2d] ">
                  {task.type}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityText(task.priority)}
                </span>
              </td>
              <td className="px-6 py-4 text-white w-[150px] text-center">
                {task.workingDays}
              </td>
              <td className="px-6 py-4 text-white">
                {formatDate(task.createdAt)}
              </td>
              <td className="px-6 py-4">
                <button
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.isActive === "true"
                      ? "bg-green-50 text-green-600 hover:bg-green-100"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {task.isActive === "true" ? "Идэвхтэй" : "Дууссан"}
                </button>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  {onEdit && (
                    <button
                      className="p-2 text-[#DDDDDD] hover:bg-[#2d2d2d] rounded-lg transition-colors"
                      onClick={() => onEdit(task)}
                    >
                      <Pen />
                    </button>
                  )}
                  <button
                    className="p-2 text-[#DDDDDD] hover:bg-[#2d2d2d] rounded-lg transition-colors"
                    onClick={() => onDelete(task._id)}
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Одоогоор даалгавар байхгүй байна
        </div>
      )}
    </div>
  );
}
