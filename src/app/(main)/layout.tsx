import { AppSidebar } from "../_components/app-sidebar";
import Protected from "./protected";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <div className="flex w-full h-screen">
        <AppSidebar />
        <main className="flex-1 w-full  overflow-auto">{children}</main>
      </div>
    </Protected>
  );
}
