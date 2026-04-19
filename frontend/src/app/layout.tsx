import type { Metadata } from "next";
import TopNav from "./components/top-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Self Reflection",
  description: "A Daily Question for Quiet Self-Reflection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F2EA] text-[#3B342E] antialiased">
        <TopNav />
        {children}
      </body>
    </html>
  );
}