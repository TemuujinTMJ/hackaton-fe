"use client";

import Image from "next/image";

interface HappinessIndexProps {
  happinessStats: Array<{
    date: string;
    emotion: Array<{
      emotionIndex: number;
      totalWorkers: number;
    }>;
  }>;
}
export default function HappinessIndex({
  happinessStats,
}: HappinessIndexProps) {
  console.log(happinessStats);
  // Emotion mapping based on your emotionIndex enum
  const emotionMapping = {
    1: { name: "Баяр хөөртэй", image: "/happiness/joy.png", color: "#FAE92D" },
    2: { name: "Гунигтай", image: "/happiness/sadness.png", color: "#1A57A0" },
    3: {
      name: "Дургуйцэлтэй",
      image: "/happiness/disgust.png",
      color: "#1EC461",
    },
    4: { name: "Уйтгартай", image: "/happiness/ennui.png", color: "#6F70D6" },
    5: { name: "Ууртай", image: "/happiness/anger.png", color: "#F92E33" },
    6: {
      name: "Түгшүүртэй",
      image: "/happiness/anxiety.png",
      color: "#FB8337",
    },
    7: {
      name: "Ичиж байна",
      image: "/happiness/embarrassment.png",
      color: "#FB8337",
    },
    8: { name: "Атаархалтай", image: "/happiness/envy.png", color: "#31BCBB" },
    9: { name: "Айдастай", image: "/happiness/fear.png", color: "#B676C0" },
  };

  return (
    <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between ">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            Сэтгэл хөдлөл
          </h2>
        </div>
        <span className="text-gray-400 text-sm">Сүүлийн 7 хоног</span>
      </div>

      {/* Vertical Emotions Chart */}
      <div className="h-76 w-full">
        <svg viewBox="0 0 800 380" className="w-full h-full">
          {(() => {
            if (!happinessStats?.length) {
              return (
                <text
                  x="400"
                  y="190"
                  fill="#9CA3AF"
                  fontSize="14"
                  textAnchor="middle"
                >
                  No emotion data available
                </text>
              );
            }

            // Aggregate emotion data across all days
            const emotionTotals: { [key: number]: number } = {};

            // Sum up totalWorkers for each emotionIndex across all days
            happinessStats.forEach((dayData) => {
              dayData.emotion.forEach((emotionData) => {
                const index = emotionData.emotionIndex;
                emotionTotals[index] =
                  (emotionTotals[index] || 0) + emotionData.totalWorkers;
              });
            });

            // Create emotion data for the chart
            const emotionCounts = Object.entries(emotionMapping).map(
              ([index, emotionInfo]) => {
                const emotionIndex = parseInt(index);
                return {
                  index: emotionIndex,
                  name: emotionInfo.name,
                  image: emotionInfo.image,
                  color: emotionInfo.color,
                  count: emotionTotals[emotionIndex] || 0,
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
