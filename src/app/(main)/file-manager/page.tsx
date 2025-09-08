import React, { Suspense } from "react";
import Header from "@/app/_components/header";
import Files from "./files";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/file`, {
    cache: "no-store",
    next: {
      tags: ["files"],
    },
  });
  const data = await res.json();

  if (!data.files) {
    return (
      <div>
        <Header title="Файл менежмент" />
        <div className="text-center py-12 text-gray-500">
          No files found or error loading files
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Файл менежмент" />
      <Suspense fallback={<div>Loading...</div>}>
        <Files files={data.files} />
      </Suspense>
    </div>
  );
}
