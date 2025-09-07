import React, { ButtonHTMLAttributes } from "react";

export default function Button({
  props,
  children,
}: {
  props: ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        {...props}
        className="mt-4 px-6 py-2 bg-[#1C1D2F] border-[#565887] border text-white rounded-lg hover:bg-[#2d2d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {children}
      </button>
    </div>
  );
}
