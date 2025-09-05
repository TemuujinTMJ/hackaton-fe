"use client";

// import { useAuth } from "@/hooks/useAuth";
import {
  ChartColumnBig,
  FileUp,
  ListPlus,
  Sparkles,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  // const { logout } = useAuth();

  const labels = [
    { link: "/", label: "Хянах самбар", icon: <ChartColumnBig /> },
    { link: "/file-manager", label: "Файл нэмэх", icon: <FileUp /> },
    { link: "/ai-agent", label: "AI туслах", icon: <Sparkles /> },
    { link: "/task-managemant", label: "Task нэмэх", icon: <ListPlus /> },
    { link: "/workers", label: "Нийт ажилчид", icon: <Users /> },
  ];

  return (
    <div className="bg-[#0C101C] text-white w-[300px] min-h-screen p-4 flex flex-col gap-4">
      <div>
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
      {/* <button
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
        onClick={() => logout()}
      >
        Log out
      </button> */}
    </div>
  );
}
