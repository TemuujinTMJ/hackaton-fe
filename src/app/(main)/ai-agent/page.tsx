import React from "react";
import Header from "@/app/_components/header";
import Chat from "./chat";

export default function Page() {
  return (
    <div className="h-full">
      <Header title="AI туслах" />
      <Chat />
    </div>
  );
}
