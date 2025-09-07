import { AppSidebar } from "../_components/app-sidebar";
import Protected from "./protected";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <div className="flex w-full ">
        <AppSidebar />
        <main className="flex-1 w-full h-screen overflow-hidden ">
          {children}
        </main>
      </div>
    </Protected>
  );
}
