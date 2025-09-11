"use client";

interface WorkerStatusProps {
  workerStats: {
    active: number;
    inactive: number;
    remote: number;
    onvacation: number;
    totalWorker: number;
  };
}

export default function WorkerStatus({ workerStats }: WorkerStatusProps) {
  return (
    <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Worker Status</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-96 h-32 ">
          <svg viewBox="0 -10 200 100" className="w-full h-full">
            {/* Background Arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#374151"
              strokeWidth="10"
            />

            {(() => {
              // Calculate worker status percentages from real data
              const activeWorkers = workerStats?.active || 0;
              const remoteWorkers = workerStats?.remote || 0;
              const onVacationWorkers = workerStats?.onvacation || 0;
              const inactiveWorkers = workerStats?.inactive || 0;
              const totalWorkers = workerStats?.totalWorker || 1;

              // Calculate angles for each segment (180 degrees total)
              const activeAngle = (activeWorkers / totalWorkers) * 180;
              const remoteAngle = (remoteWorkers / totalWorkers) * 180;
              const vacationAngle = (onVacationWorkers / totalWorkers) * 180;
              const inactiveAngle = (inactiveWorkers / totalWorkers) * 180;

              // Calculate cumulative angles
              let currentAngle = 0;
              const segments = [];

              // Helper function to create arc path
              const createArcPath = (startAngle: number, endAngle: number) => {
                const centerX = 100;
                const centerY = 80;
                const radius = 80;

                const startRadians = (startAngle * Math.PI) / 180;
                const endRadians = (endAngle * Math.PI) / 180;

                const x1 = centerX - radius * Math.cos(startRadians);
                const y1 = centerY - radius * Math.sin(startRadians);
                const x2 = centerX - radius * Math.cos(endRadians);
                const y2 = centerY - radius * Math.sin(endRadians);

                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
              };

              // Active Workers Segment
              if (activeWorkers > 0) {
                const startAngle = currentAngle;
                const endAngle = currentAngle + activeAngle;
                segments.push(
                  <path
                    key="active"
                    d={createArcPath(startAngle, endAngle)}
                    fill="none"
                    stroke="#CB3CFF"
                    strokeWidth="10"
                    strokeLinecap="butt"
                    className="transition-all duration-1000"
                  />
                );
                currentAngle = endAngle;
              }

              // Remote Workers Segment
              if (remoteWorkers > 0) {
                const startAngle = currentAngle;
                const endAngle = currentAngle + remoteAngle;
                segments.push(
                  <path
                    key="remote"
                    d={createArcPath(startAngle, endAngle)}
                    fill="none"
                    stroke="#57C3FF"
                    strokeWidth="10"
                    strokeLinecap="butt"
                    className="transition-all duration-1000"
                  />
                );
                currentAngle = endAngle;
              }

              // Vacation Workers Segment
              if (onVacationWorkers > 0) {
                const startAngle = currentAngle;
                const endAngle = currentAngle + vacationAngle;
                segments.push(
                  <path
                    key="vacation"
                    d={createArcPath(startAngle, endAngle)}
                    fill="none"
                    stroke="#9A91FB"
                    strokeWidth="10"
                    strokeLinecap="butt"
                    className="transition-all duration-1000"
                  />
                );
                currentAngle = endAngle;
              }

              // Inactive Workers Segment
              if (inactiveWorkers > 0) {
                const startAngle = currentAngle;
                const endAngle = currentAngle + inactiveAngle;
                segments.push(
                  <path
                    key="inactive"
                    d={createArcPath(startAngle, endAngle)}
                    fill="none"
                    stroke="#D1DBF9"
                    strokeWidth="10"
                    strokeLinecap="butt"
                    className="transition-all duration-1000"
                  />
                );
              }

              return (
                <>
                  {segments}

                  {/* Center Value - Show most relevant metric */}
                  <text
                    x="100"
                    y="65"
                    textAnchor="middle"
                    className="fill-white text-3xl font-bold"
                  >
                    {totalWorkers}
                  </text>
                  <text
                    x="100"
                    y="80"
                    textAnchor="middle"
                    className="fill-gray-400 text-sm"
                  >
                    Total Workers
                  </text>
                </>
              );
            })()}
          </svg>
        </div>

        {/* Real Worker Status Legend */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#CB3CFF" }}
              ></div>
              <span className="text-gray-400 text-sm">Active</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.active || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#57C3FF" }}
              ></div>
              <span className="text-gray-400 text-sm">Remote</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.remote || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#9A91FB" }}
              ></div>
              <span className="text-gray-400 text-sm">On Vacation</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.onvacation || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#D1DBF9" }}
              ></div>
              <span className="text-gray-400 text-sm">Inactive</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.inactive || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
