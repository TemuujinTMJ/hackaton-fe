import React from "react";

export default function Card({
  title,
  data,
  description,
  icon,
}: {
  title: string;
  data: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-zinc-500 rounded-2xl p-4 ">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium text-gray-200">{title}</div>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-pink-400">{data}</div>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
