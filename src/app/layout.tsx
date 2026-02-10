import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/providers/AuthProvider";
import ClientLayout from "./components/ClientLayout";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Word-A-Day",
  description: "Learn a new word daily, track your streak, and compete!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-gray-900 text-gray-100">
        <ClientLayout>
          <AuthProvider>
            <NavBar />
            <main className="max-w-4xl mx-auto px-2 py-8">
              {children}
            </main>
          </AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
