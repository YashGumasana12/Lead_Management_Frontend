import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LeadProvider } from "../context/LeadContext";
import { ClientErrorBoundary } from "../components/ClientErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Management System",
  description: "A modern lead management system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen`}
      >
        <ClientErrorBoundary>
          <LeadProvider>{children}</LeadProvider>
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
