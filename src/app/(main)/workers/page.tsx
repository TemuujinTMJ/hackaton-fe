import React, { Suspense } from "react";
import Employee from "./employee";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workers`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Employee data={data} />
    </Suspense>
  );
}
