"use client";
import React from "react";
import TaskTable from "./taskTable";

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
  const urgentTasks = data.filter((task) => task.type === "urgent");
  const normalTasks = data.filter((task) => task.type === "normal");
  const onboardingTasks = data.filter((task) => task.type === "onboarding");
  return (
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
  );
}
