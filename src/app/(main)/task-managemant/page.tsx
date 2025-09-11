import React, { Suspense } from "react";
import Tasks from "./tasks";
import { SmallLoader } from "../_components";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tasks`, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <div>
      <Suspense fallback={<SmallLoader />}>
        <Tasks tasks={data.data} />
      </Suspense>
    </div>
  );
}
