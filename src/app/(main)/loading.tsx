import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B14] via-[#1A1D2E] to-[#0A0B14] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Techpack Logo with Animation */}
        <div className="relative">
          {/* Rotating Ring */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>

          {/* Logo Container */}
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 animate-pulse">
            <Image
              src="https://www.techpack.mn/Logo_small.ico"
              alt="Techpack Logo"
              width={48}
              height={48}
              className="animate-pulse"
              priority
            />
          </div>

          {/* Pulsing Ring */}
          <div className="absolute inset-0 w-24 h-24 border-2 border-blue-400/30 rounded-full animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-white text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-400 text-sm">Initializing Techpack system</p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
