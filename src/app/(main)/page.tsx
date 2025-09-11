import { DashboardData } from "@/types/types";
import Header from "../_components/header";
import {
  StatsCards,
  HappinessIndex,
  WorkerStatus,
  QATable,
  SmallLoader,
} from "./_components";
import { Suspense } from "react";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard`, {
    cache: "no-store",
  });
  const qa = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/qa`,
    {
      cache: "no-store",
    }
  );
  const data: DashboardData = await res.json();
  const qaData = await qa.json();
  return (
    <div className="min-h-screen">
      <Header title="Хянах самбар" />

      <Suspense fallback={<SmallLoader />}>
        <div className="p-6 space-y-6">
          <StatsCards
            workerStats={data.workerStats}
            questionStats={data.questionStats}
            happinessStats={data.happinessStats}
            taskTypeCompletions={data.taskTypeCompletions}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <QATable qaData={qaData.questions} />
            <div className="space-y-6">
              <HappinessIndex happinessStats={data.happinessStats} />

              <WorkerStatus workerStats={data.workerStats} />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
