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

export default function Tasks({ tasks }: TasksProps) {
  const [data, setData] = React.useState(tasks);
  const [open, setOpen] = React.useState(false);
  const urgentTasks = data.filter((task) => task.type === "urgent");
  const normalTasks = data.filter((task) => task.type === "normal");
  const onboardingTasks = data.filter((task) => task.type === "onboarding");
  return (
    <div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Task үүсгэх"
        primaryButton={{ label: "Save", onClick: () => {} }}
        secondaryButton={{ label: "Cancel", onClick: () => setOpen(false) }}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Task үүсгэх</h2>
          {/* Add Task Form */}
        </div>
      </Modal>
      <Header
        title="Task management"
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
              <TaskTable tasks={urgentTasks} />
            </div>
          )}
          {normalTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Энгийн даалгаврууд
              </h2>
              <TaskTable tasks={normalTasks} />
            </div>
          )}
          {onboardingTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Танилцуулга даалгаврууд
              </h2>
              <TaskTable tasks={onboardingTasks} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
