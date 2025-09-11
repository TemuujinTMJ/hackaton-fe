import React, { Suspense } from "react";
import Employee from "./employee";
import { SmallLoader } from "../_components";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workers`, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <Suspense fallback={<SmallLoader />}>
      <Employee data={data} />
    </Suspense>
  );
}
