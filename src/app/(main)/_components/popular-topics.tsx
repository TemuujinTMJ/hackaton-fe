"use client";

interface TopicData {
  fileName: string;
  amount: number;
  _id: string;
}

interface PopularTopicsProps {
  topicsData: TopicData[];
}

export default function PopularTopics({ topicsData }: PopularTopicsProps) {
  const sortedTopics = [...topicsData]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 7);

  const maxAmount = Math.max(...sortedTopics.map((topic) => topic.amount));

  const getFileInfo = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toUpperCase() || "FILE";
    const nameWithoutExt =
      fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    const truncatedName =
      nameWithoutExt.length > 40
        ? nameWithoutExt.substring(0, 40) + "..."
        : nameWithoutExt;

    return { name: truncatedName, extension };
  };

  return (
    <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            Түгээмэл сэдвүүд
          </h2>
          <p className="text-gray-400 text-sm">Хамгийн их асуугдсан файлууд</p>
        </div>
        <div className="text-gray-400 text-sm">
          Нийт {topicsData.length} сэдэв
        </div>
      </div>

      <div className="space-y-4">
        {sortedTopics.map((topic, index) => {
          const fileInfo = getFileInfo(topic.fileName);
          const barWidth = maxAmount > 0 ? (topic.amount / maxAmount) * 100 : 0;

          return (
            <div key={topic._id} className="group">
              <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                {/* Rank */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {index + 1}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium text-white bg-zinc-500`}
                    >
                      {fileInfo.extension}
                    </span>
                    <span className="text-white text-sm font-medium truncate">
                      {fileInfo.name}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-white text-lg font-bold">
                    {topic.amount}
                  </div>
                  <div className="text-gray-400 text-xs">асуулт</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {topicsData.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-white text-lg font-medium mb-2">Сэдэв байхгүй</h3>
          <p className="text-gray-400 text-sm">
            Файлын талаарх асуултууд энд харагдана.
          </p>
        </div>
      )}
    </div>
  );
}
