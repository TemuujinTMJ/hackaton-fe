"use client";
import React from "react";
import TaskTable from "./taskTable";
import Header from "@/app/_components/header";
import Modal from "@/app/_components/modal";
import Button from "@/app/_components/button";

interface TasksProps {
  tasks: {
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
  }[];
}

interface TaskFormData {
  title: string;
  description: string;
  priority: number;
  type: "urgent" | "normal" | "onboarding";
  workingDays: string;
  isActive: string;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  priority?: string;
  workingDays?: string;
}

const initialFormData: TaskFormData = {
  title: "",
  description: "",
  priority: 1,
  type: "normal",
  workingDays: "1",
  isActive: "true",
};

const initialErrors: ValidationErrors = {};

export default function Tasks({ tasks }: TasksProps) {
  const [data, setData] = React.useState(tasks);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<TaskFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState<string | null>(null);
  const [deleteModal, setDeleteModal] = React.useState<{
    isOpen: boolean;
    taskId: string | null;
  }>({
    isOpen: false,
    taskId: null,
  });
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [errors, setErrors] = React.useState<ValidationErrors>(initialErrors);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Title validation
    if (formData.title.trim().length < 3) {
      newErrors.title = "Гарчиг хамгийн багадаа 3 тэмдэгт байх ёстой";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Гарчиг хамгийн ихдээ 100 тэмдэгт байх ёстой";
    }

    // Description validation
    if (formData.description.trim().length < 10) {
      newErrors.description = "Тайлбар хамгийн багадаа 10 тэмдэгт байх ёстой";
    } else if (formData.description.trim().length > 500) {
      newErrors.description = "Тайлбар хамгийн ихдээ 500 тэмдэгт байх ёстой";
    }

    // Priority validation
    if (formData.priority < 1 || formData.priority > 5) {
      newErrors.priority = "Тэргүүлэх зэрэг 1-5 хооронд байх ёстой";
    }

    // Working days validation
    const workingDaysNum = parseInt(formData.workingDays);
    if (isNaN(workingDaysNum) || workingDaysNum < 1) {
      newErrors.workingDays = "Ажлын өдөр хамгийн багадаа 1 байх ёстой";
    } else if (workingDaysNum > 365) {
      newErrors.workingDays = "Ажлын өдөр хэт их байна";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingTaskId) {
        // Update existing task
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/update/${editingTaskId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        // Update the task in the data state
        setData((prevData) =>
          prevData.map((task) =>
            task._id === editingTaskId
              ? {
                  ...task,
                  ...formData,
                  updatedAt: new Date().toISOString(),
                }
              : task
          )
        );
      } else {
        // Create new task
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create task");
        }

        const newTask = await response.json();

        // Add the new task to the data state
        setData((prevData) => [
          {
            ...formData,
            _id: newTask.data._id,
          } as TasksProps["tasks"][0],
          ...prevData,
        ]);
      }

      handleCloseModal();
    } catch (error) {
      console.error(editingTaskId ? "Update error:" : "Create error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setFormData(initialFormData);
    setEditingTaskId(null);
  };

  const handleEditTask = (task: TasksProps["tasks"][0]) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      type: task.type,
      workingDays: task.workingDays,
      isActive: task.isActive,
    });
    setEditingTaskId(task._id);
    setOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/delete/${taskId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update local state after successful deletion
      setData((prevData) => prevData.filter((task) => task._id !== taskId));
      setDeleteModal({ isOpen: false, taskId: null });
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const urgentTasks = data.filter((task) => task.type === "urgent");
  const normalTasks = data.filter((task) => task.type === "normal");
  const onboardingTasks = data.filter((task) => task.type === "onboarding");
  return (
    <div>
      {/* Create/Edit Task Modal */}
      <Modal
        isOpen={open}
        onClose={handleCloseModal}
        title={editingTaskId ? "Task засах" : "Task үүсгэх"}
        primaryButton={{
          label: editingTaskId ? "Update" : "Save",
          onClick: handleSubmit,
          loading: isSubmitting,
        }}
        secondaryButton={{
          label: "Cancel",
          onClick: handleCloseModal,
        }}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
                errors.title ? "border-red-500" : "border-gray-600"
              }`}
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as TaskFormData["type"],
                  }))
                }
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                required
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="onboarding">Onboarding</option>
              </select>
            </div>
            <div className="w-[100px]">
              <label className="block text-sm font-medium text-gray-300">
                Priority
              </label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: parseInt(e.target.value) || 1,
                  }))
                }
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
                  errors.priority ? "border-red-500" : "border-gray-600"
                }`}
                min={1}
                max={5}
                required
              />
              {errors.priority && (
                <p className="mt-1 text-sm text-red-500">{errors.priority}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                value={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                required
              >
                <option value="true">Идэвхтэй</option>
                <option value="false">Дууссан</option>
              </select>
            </div>
            <div className="w-[100px]">
              <label className="block text-sm font-medium text-gray-300">
                Working Days
              </label>
              <input
                type="number"
                value={formData.workingDays}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    workingDays: e.target.value,
                  }))
                }
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
                  errors.workingDays ? "border-red-500" : "border-gray-600"
                }`}
                min={1}
                required
              />
              {errors.workingDays && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.workingDays}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
                errors.description ? "border-red-500" : "border-gray-600"
              }`}
              rows={3}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
        title="Даалгавар устгах"
        primaryButton={{
          label: "Устгах",
          onClick: () =>
            deleteModal.taskId && handleDeleteTask(deleteModal.taskId),
          loading: isDeleting,
        }}
        secondaryButton={{
          label: "Цуцлах",
          onClick: () => setDeleteModal({ isOpen: false, taskId: null }),
        }}
      >
        <div className="py-4">
          <p className="text-white">
            Та энэ даалгаврыг устгахдаа итгэлтэй байна уу?
          </p>
          <p className="text-gray-400 mt-2">Энэ үйлдлийг буцаах боломжгүй.</p>
        </div>
      </Modal>

      <Header
        title="Таск менежмент"
        extra={
          <Button props={{ onClick: () => setOpen(true) }}>Add Task</Button>
        }
      />
      <div className="h-[calc(100vh-8rem)] overflow-y-auto px-10">
        <div className="space-y-8">
          {urgentTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Яаралтай даалгаврууд
              </h2>
              <TaskTable
                tasks={urgentTasks}
                onDelete={(taskId) => setDeleteModal({ isOpen: true, taskId })}
                onEdit={handleEditTask}
              />
            </div>
          )}
          {normalTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Энгийн даалгаврууд
              </h2>
              <TaskTable
                tasks={normalTasks}
                onDelete={(taskId) => setDeleteModal({ isOpen: true, taskId })}
                onEdit={handleEditTask}
              />
            </div>
          )}
          {onboardingTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Танилцуулга даалгаврууд
              </h2>
              <TaskTable
                tasks={onboardingTasks}
                onDelete={(taskId) => setDeleteModal({ isOpen: true, taskId })}
                onEdit={handleEditTask}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
