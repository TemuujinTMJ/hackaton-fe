import React from "react";
import Header from "@/app/_components/header";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return (
    <div>
      <Header title="Task management" />
      {JSON.stringify(data)}
    </div>
  );
}
