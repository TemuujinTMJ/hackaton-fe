import React, { Suspense } from "react";
import Employee from "./employee";
import Header from "@/app/_components/header";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workers`, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <div>
      <Header title="Нийт ажилчид" />
      <Suspense fallback={<div>Loading...</div>}>
        <Employee data={data} />
      </Suspense>
    </div>
  );
}
