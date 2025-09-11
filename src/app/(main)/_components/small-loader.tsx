import React from "react";
import Image from "next/image";

interface SmallLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function SmallLoader({
  size = "md",
  text = "Loading...",
  className = "",
}: SmallLoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const logoSizes = {
    sm: { width: 16, height: 16 },
    md: { width: 24, height: 24 },
    lg: { width: 32, height: 32 },
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      {/* Compact Logo Loader */}
      <div className="relative mb-3">
        {/* Rotating Ring */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin`}
        ></div>

        {/* Logo Container */}
        <div
          className={`${sizeClasses[size]} bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20`}
        >
          <Image
            src="https://www.techpack.mn/Logo_small.ico"
            alt="Techpack"
            width={logoSizes[size].width}
            height={logoSizes[size].height}
            className="animate-pulse"
            priority
          />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p className={`text-gray-300 ${textSizes[size]} font-medium`}>{text}</p>
      )}

      {/* Small Progress Dots */}
      <div className="flex space-x-1 mt-2">
        <div
          className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: "100ms" }}
        ></div>
        <div
          className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"
          style={{ animationDelay: "200ms" }}
        ></div>
      </div>
    </div>
  );
}
