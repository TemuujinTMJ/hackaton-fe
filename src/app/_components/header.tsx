import React from "react";

export default function Header({
  title,
  extra,
}: {
  title: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="px-10 py-4 flex items-center justify-between border-b border-[#2D2F48] mb-4 sticky top-0 bg-[#101522] z-30">
      <h1 className="text-xl font-bold">{title}</h1>
      {extra}
    </div>
  );
}
