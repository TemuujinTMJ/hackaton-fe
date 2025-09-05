import React from "react";
import Header from "@/app/_components/header";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/file`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return (
    <div>
      <Header title="File Management" />
      {JSON.stringify(data)}
    </div>
  );
}
