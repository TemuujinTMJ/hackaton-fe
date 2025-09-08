import React, { Suspense } from "react";
import Employee from "./employee";
import Header from "@/app/_components/header";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
