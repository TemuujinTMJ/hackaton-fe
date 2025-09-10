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
        <div className="relative w-48 h-24 mb-6">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background Arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {(() => {
              // Calculate worker status percentages from real data
              const activeWorkers = workerStats?.active || 0;
              const remoteWorkers = workerStats?.remote || 0;
              const onVacationWorkers = workerStats?.onvacation || 0;
              const inactiveWorkers = workerStats?.inactive || 0;
              const totalWorkers = workerStats?.totalWorker || 1;

              // Calculate individual percentages
              const activePercentage = (activeWorkers / totalWorkers) * 100;
              const remotePercentage = (remoteWorkers / totalWorkers) * 100;
              const vacationPercentage =
                (onVacationWorkers / totalWorkers) * 100;
              const inactivePercentage = (inactiveWorkers / totalWorkers) * 100;

              // Calculate arc lengths (180 degrees total = 160 units)
              const activeArcLength = (activePercentage / 100) * 160;
              const remoteArcLength = (remotePercentage / 100) * 160;
              const vacationArcLength = (vacationPercentage / 100) * 160;
              const inactiveArcLength = (inactivePercentage / 100) * 160;

              // Calculate cumulative offsets for stacking arcs
              const activeOffset = 0;
              const remoteOffset = activeArcLength;
              const vacationOffset = activeArcLength + remoteArcLength;
              const inactiveOffset =
                activeArcLength + remoteArcLength + vacationArcLength;

              return (
                <>
                  {/* Active Workers Arc - Purple */}
                  {activeArcLength > 0 && (
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${activeArcLength} 160`}
                      strokeDashoffset={-activeOffset}
                      className="transition-all duration-1000"
                    />
                  )}

                  {/* Remote Workers Arc - Cyan */}
                  {remoteArcLength > 0 && (
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${remoteArcLength} 160`}
                      strokeDashoffset={-remoteOffset}
                      className="transition-all duration-1000"
                    />
                  )}

                  {/* On Vacation Workers Arc - Yellow */}
                  {vacationArcLength > 0 && (
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="#EAB308"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${vacationArcLength} 160`}
                      strokeDashoffset={-vacationOffset}
                      className="transition-all duration-1000"
                    />
                  )}

                  {/* Inactive Workers Arc - Gray */}
                  {inactiveArcLength > 0 && (
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="#6B7280"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${inactiveArcLength} 160`}
                      strokeDashoffset={-inactiveOffset}
                      className="transition-all duration-1000"
                    />
                  )}

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
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-gray-400 text-sm">Active</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.active || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-cyan-500"></div>
              <span className="text-gray-400 text-sm">Remote</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.remote || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-yellow-500"></div>
              <span className="text-gray-400 text-sm">On Vacation</span>
            </div>
            <span className="text-white text-sm font-medium">
              {workerStats?.onvacation || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-gray-600"></div>
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
