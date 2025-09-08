import React, { Suspense } from "react";
import Callback from "./render";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Callback />
    </Suspense>
  );
}
