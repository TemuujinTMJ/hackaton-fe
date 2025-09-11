"use client";

interface StatsCardsProps {
  workerStats: {
    active: number;
    inactive: number;
    remote: number;
    onvacation: number;
    totalWorker: number;
  };
  questionStats: {
    total: number;
    topic: Array<{
      fileName: string;
      amount: number;
      _id: string;
    }>;
  };
  happinessStats: Array<{
    date: string;
    emotion: Array<{
      emotion: string;
      emotionIndex: number;
      totalWorkers: number;
    }>;
  }>;
  taskTypeCompletions: Array<{
    _id: string;
    count: number;
  }>;
}

export default function StatsCards({
  workerStats,
  questionStats,
  happinessStats,
  taskTypeCompletions,
}: StatsCardsProps) {
  // Calculate average happiness
  const calculateAvgHappiness = () => {
    if (!happinessStats || happinessStats.length === 0) return 0;

    // Emotion index to happiness point mapping
    const emotionToPointMapping: { [key: number]: number } = {
      1: 9, // Joy = 9 points
      7: 8, // Embarrassment = 8 points
      8: 7, // Envy = 7 points
      4: 6, // Ennui = 6 points
      6: 5, // Anxiety = 5 points
      9: 4, // Fear = 4 points
      3: 3, // Disgust = 3 points
      2: 2, // Sadness = 2 points
      5: 1, // Anger = 1 point
    };

    let totalScore = 0;
    let totalWorkers = 0;

    happinessStats.forEach((day) => {
      day.emotion.forEach((emotion) => {
        const happinessPoint = emotionToPointMapping[emotion.emotionIndex] || 0;
        totalScore += happinessPoint * emotion.totalWorkers;
        totalWorkers += emotion.totalWorkers;
      });
    });
    return totalWorkers > 0 ? (totalScore / totalWorkers + 1).toFixed(1) : 0;
  };
  console.log(happinessStats);
  const completedTasks =
    taskTypeCompletions?.reduce((acc, task) => acc + task.count, 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Employees Card */}
      <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="text-green-400 text-sm font-medium">+12%</div>
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">Нийт ажилчид</p>
          <p className="text-white text-3xl font-bold">
            {workerStats?.totalWorker || 0}
          </p>
        </div>
      </div>

      {/* Average Happiness Card */}
      <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div className="text-green-400 text-sm font-medium">+8.2%</div>
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">
            Дундаж баяр баясгалан
          </p>
          <p className="text-white text-3xl font-bold">
            {calculateAvgHappiness()}/10
          </p>
        </div>
      </div>

      {/* Total Questions Card */}
      <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-green-400 text-sm font-medium">+15%</div>
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">
            Нийт асуултууд
          </p>
          <p className="text-white text-3xl font-bold">
            {questionStats?.total || 0}
          </p>
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-green-400 text-sm font-medium">+22%</div>
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">
            Гүйцэтгэсэн даалгаврууд
          </p>
          <p className="text-white text-3xl font-bold">{completedTasks}</p>
        </div>
      </div>
    </div>
  );
}
