import { AuthProvider } from "@/contexts/authProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen gradient-background">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
