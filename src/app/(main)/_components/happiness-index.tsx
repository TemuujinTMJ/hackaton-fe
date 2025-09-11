"use client";

import Image from "next/image";

interface HappinessIndexProps {
  happinessStats: Array<{
    date: string;
    emotion: Array<{
      emotion: string;
      emotionIndex: number;
      totalWorkers: number;
    }>;
  }>;
}

export default function HappinessIndex({
  happinessStats,
}: HappinessIndexProps) {
  // Emotion mapping based on your emotionIndex enum
  const emotionMapping = {
    1: { name: "Баяр хөөр", image: "/happiness/joy.png", color: "#22C55E" },
    2: { name: "Гунигтай", image: "/happiness/sadness.png", color: "#EF4444" },
    3: {
      name: "Жигшээх",
      image: "/happiness/disgust.png",
      color: "#DC2626",
    },
    4: { name: "Уйтгар", image: "/happiness/ennui.png", color: "#6B7280" },
    5: { name: "Уур хилэн", image: "/happiness/anger.png", color: "#DC2626" },
    6: { name: "Түгшүүр", image: "/happiness/anxiety.png", color: "#F59E0B" },
    7: {
      name: "Ичгүүр",
      image: "/happiness/embarrassment.png",
      color: "#F97316",
    },
    8: { name: "Атаархал", image: "/happiness/envy.png", color: "#10B981" },
    9: { name: "Айдас", image: "/happiness/fear.png", color: "#7C3AED" },
  };

  return (
    <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Сэтгэл хөдлөл</h2>
        </div>
        <span className="text-gray-400 text-sm">Сүүлийн 7 хоног</span>
      </div>

      {/* Vertical Emotions Chart */}
      <div className="h-80 w-full">
        <svg viewBox="0 0 800 380" className="w-full h-full">
          {(() => {
            // Get latest happiness data for emotion distribution
            const latestHappiness = happinessStats?.slice(-1)[0];

            if (!latestHappiness?.emotion.length) {
              return (
                <text
                  x="200"
                  y="115"
                  fill="#9CA3AF"
                  fontSize="14"
                  textAnchor="middle"
                >
                  No emotion data available
                </text>
              );
            }

            // Create emotion data from the latest happiness data using emotionIndex
            const emotionCounts = Object.entries(emotionMapping).map(
              ([index, emotionInfo]) => {
                const emotionIndex = parseInt(index);
                const matchingEmotion = latestHappiness.emotion.find(
                  (e) => e.emotionIndex === emotionIndex
                );

                return {
                  index: emotionIndex,
                  name: emotionInfo.name,
                  image: emotionInfo.image,
                  color: emotionInfo.color,
                  count: matchingEmotion?.totalWorkers || 0,
                };
              }
            );

            // Get max count for scaling bars
            const maxCount = Math.max(...emotionCounts.map((e) => e.count), 1);

            // Bar configuration - full width chart
            const totalWidth = 720;
            const barSpacing = 12;
            const barWidth =
              (totalWidth -
                (Object.keys(emotionMapping).length - 1) * barSpacing) /
              Object.keys(emotionMapping).length;
            const chartHeight = 300;
            const startX = 40;

            return (
              <>
                {/* Vertical bars for each emotion */}
                {emotionCounts.map((emotion, index) => {
                  const barHeight =
                    maxCount > 0 ? (emotion.count / maxCount) * chartHeight : 0;
                  const x = startX + index * (barWidth + barSpacing);
                  const baseY = 260; // Base line for bars
                  const y = baseY - barHeight;

                  return (
                    <g key={emotion.name}>
                      {/* Bar with hover group */}
                      <g className="group cursor-pointer">
                        {/* Bar */}
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          fill={emotion.color}
                          rx="4"
                          className="transition-all duration-500 group-hover:opacity-100"
                          opacity="0.8"
                        />
                        {/* Bar highlight */}
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={Math.max(barHeight * 0.3, 4)}
                          fill={emotion.color}
                          rx="4"
                          className="transition-all duration-500"
                          opacity="1"
                        />
                        {/* Emotion image at bottom */}
                        <foreignObject
                          x={x + (barWidth - 50) / 2}
                          y="270"
                          width="50"
                          height="50"
                        >
                          <Image
                            src={emotion.image}
                            alt={emotion.name}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        </foreignObject>

                        {/* Diagonal emotion name below image */}
                        <text
                          x={x + barWidth / 2}
                          y="335"
                          fill="#9CA3AF"
                          fontSize="16"
                          textAnchor="end"
                          fontWeight="500"
                          transform={`rotate(-50, ${x + barWidth / 2}, 335)`}
                          className="transition-colors duration-300 group-hover:fill-white"
                        >
                          {emotion.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
                {/* Y-axis line */}
                <line
                  x1="30"
                  y1="40"
                  x2="30"
                  y2="260"
                  stroke="#374151"
                  strokeWidth="1"
                />
                {/* X-axis line */}
                <line
                  x1="30"
                  y1="260"
                  x2="770"
                  y2="260"
                  stroke="#374151"
                  strokeWidth="1"
                />
              </>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}
