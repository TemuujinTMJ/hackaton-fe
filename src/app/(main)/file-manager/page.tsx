import React, { Suspense } from "react";
import Header from "@/app/_components/header";
import Files from "./files";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/file`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      <Header title="Файл менежмент" />
      <Suspense fallback={<div>Loading...</div>}>
        <Files files={data.files} />
      </Suspense>
    </div>
  );
}
