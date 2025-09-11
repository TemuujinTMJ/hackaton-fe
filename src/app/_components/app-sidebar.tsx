"use client";

import { useAuth } from "@/contexts/authProvider";
import {
  ChartColumnBig,
  FileQuestion,
  FileUp,
  ListPlus,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "./button";
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userInfo, logout } = useAuth();

  const labels = [
    { link: "/", label: "Хянах самбар", icon: <ChartColumnBig /> },
    { link: "/file-manager", label: "Файл менежмент", icon: <FileUp /> },
    { link: "/ai-agent", label: "AI туслах", icon: <Sparkles /> },
    { link: "/task-managemant", label: "Таск менежмент", icon: <ListPlus /> },
    { link: "/workers", label: "Нийт ажилчид", icon: <Users /> },
    { link: "/feedback", label: "Санал хүсэлт", icon: <FileQuestion /> },
  ];
  return (
    <div className="bg-[#0C101C] text-white w-[300px] min-h-screen p-4 flex flex-col gap-32">
      <div className="flex items-center gap-4 mb-10">
        <Image
          src="/login/blob.png"
          alt="User Avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <div>{(userInfo as { name?: string })?.name}</div>
          <div className="text-sm text-gray-400">
            {(userInfo as { email?: string })?.email}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <div className="grid gap-6">
          {labels.map((item) => (
            <div
              key={item.link}
              onClick={() => router.push(item.link)}
              className={`flex items-center gap-2 p-2 rounded-[8px] transition-colors duration-300 cursor-pointer
            ${
              pathname === item.link
                ? "bg-[#1B202F] text-[#7CC8F5]"
                : "bg-transparent"
            }`}
            >
              <div
                className={`${
                  pathname === item.link ? "text-[#7CC8F5]" : "text-white"
                }`}
              >
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="w-full">
          <Button
            props={{
              onClick: () => {
                logout();
              },
              style: {
                width: "100%",
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            Системээс гарах
          </Button>
        </div>
      </div>
    </div>
  );
}
