"use client";

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
  // Calculate average happiness percentage
  const calculateHappinessPercentage = () => {
    const latestHappiness = happinessStats?.slice(-1)[0];
    if (!latestHappiness?.emotion.length) return "28.5%";

    const totalWorkers = latestHappiness.emotion.reduce(
      (sum, e) => sum + e.totalWorkers,
      0
    );
    const avgHappiness =
      totalWorkers > 0
        ? latestHappiness.emotion.reduce(
            (sum, e) => sum + e.emotionIndex * e.totalWorkers,
            0
          ) / totalWorkers
        : 2.85;

    return `${(avgHappiness * 10).toFixed(1)}%`;
  };

  // Helper function to get emotion names
  const getEmotionName = (level: number): string => {
    const emotions = {
      1: "Very Sad",
      2: "Sad",
      3: "Unhappy",
      4: "Neutral-",
      5: "Neutral",
      6: "Neutral+",
      7: "Happy",
      8: "Very Happy",
      9: "Extremely Happy",
    };
    return emotions[level as keyof typeof emotions] || `Level ${level}`;
  };

  // Color function for emotions
  const getEmotionColor = (level: number): string => {
    if (level <= 3) return "#EF4444"; // Red for sad
    if (level <= 4) return "#F97316"; // Orange for slightly sad
    if (level === 5) return "#EAB308"; // Yellow for neutral
    if (level <= 6) return "#FACC15"; // Light yellow for slightly happy
    if (level <= 7) return "#4ADE80"; // Light green for happy
    return "#22C55E"; // Green for very happy
  };

  return (
    <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            Happiness index
          </h2>
          <div className="text-green-400 text-sm font-medium">
            {calculateHappinessPercentage()}
          </div>
        </div>
        <span className="text-gray-400 text-sm">Last 12 months</span>
      </div>

      {/* Vertical Emotions Chart (1-9) */}
      <div className="h-48 flex items-end justify-center">
        <svg viewBox="0 0 400 230" className="w-full h-full">
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

            // Create emotion levels 1-9 with their worker counts
            const emotionLevels = Array.from({ length: 9 }, (_, i) => {
              const level = i + 1;
              const emotionData = latestHappiness.emotion.find(
                (e) => e.emotionIndex === level
              );
              return {
                level,
                count: emotionData?.totalWorkers || 0,
                emotion: emotionData?.emotion || getEmotionName(level),
              };
            });

            // Get max count for scaling bars
            const maxCount = Math.max(...emotionLevels.map((e) => e.count), 1);

            // Bar configuration - adjusted for more top space
            const barWidth = 35;
            const barSpacing = 8;
            const chartHeight = 140; // Reduced to make room for labels
            const startX = 20;

            return (
              <>
                {/* Vertical bars for each emotion level */}
                {emotionLevels.map((emotion, index) => {
                  const barHeight =
                    maxCount > 0 ? (emotion.count / maxCount) * chartHeight : 0;
                  const x = startX + index * (barWidth + barSpacing);
                  const baseY = 180; // Base line for bars
                  const y = baseY - barHeight;

                  return (
                    <g key={emotion.level}>
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={getEmotionColor(emotion.level)}
                        rx="4"
                        className="transition-all duration-500"
                        opacity="0.8"
                      />

                      {/* Bar highlight */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={Math.max(barHeight * 0.3, 4)}
                        fill={getEmotionColor(emotion.level)}
                        rx="4"
                        className="transition-all duration-500"
                        opacity="1"
                      />

                      {/* Emotion level number */}
                      <text
                        x={x + barWidth / 2}
                        y="200"
                        fill="#9CA3AF"
                        fontSize="12"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        {emotion.level}
                      </text>

                      {/* Worker count on top of bar - with proper spacing */}
                      {emotion.count > 0 && (
                        <text
                          x={x + barWidth / 2}
                          y={Math.max(y - 8, 20)}
                          fill="#FFFFFF"
                          fontSize="10"
                          textAnchor="middle"
                          fontWeight="500"
                        >
                          {emotion.count}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Y-axis line */}
                <line
                  x1="15"
                  y1="30"
                  x2="15"
                  y2="180"
                  stroke="#374151"
                  strokeWidth="1"
                />

                {/* X-axis line */}
                <line
                  x1="15"
                  y1="180"
                  x2="390"
                  y2="180"
                  stroke="#374151"
                  strokeWidth="1"
                />

                {/* Y-axis label */}
                <text
                  x="10"
                  y="105"
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="middle"
                  transform="rotate(-90, 10, 105)"
                >
                  Workers
                </text>

                {/* X-axis label */}
                <text
                  x="200"
                  y="225"
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="middle"
                >
                  Emotion Level (1=Sad → 9=Happy)
                </text>
              </>
            );
          })()}
        </svg>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
        <span className="text-gray-400 text-sm">
          {(() => {
            const dataCount = happinessStats?.length || 0;
            if (dataCount === 0) return "No data available";
            if (dataCount === 1) return "1 data point";
            return `Last ${dataCount} data points`;
          })()}
        </span>
        <span className="text-gray-400 text-sm">Live data</span>
      </div>
    </div>
  );
}
