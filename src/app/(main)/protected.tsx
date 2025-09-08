"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setLoading(false);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
