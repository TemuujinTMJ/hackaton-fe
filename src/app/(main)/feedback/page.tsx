import Header from "@/app/_components/header";
import { Suspense } from "react";
import Feedback from "./feedback";

export default async function Page() {
  const resCat = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/feedback`, {
    cache: "no-store",
  });
  const data = await res.json();
  const cat = await resCat.json();
  console.log(cat);
  return (
    <div>
      <Header title="Нийт ажилчид" />
      <Suspense fallback={<div>Loading...</div>}>
        <Feedback data={data.data} cat={cat.data} />
      </Suspense>
    </div>
  );
}
