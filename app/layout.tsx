import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "@/styles/globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ancile Canada",
  description:
    "our trusted partner for Study Abroad services, expert Staffing & Recruiting services, and Technology Consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} flex flex-col antialiased scroll-smooth overflow-x-hidden min-h-screen font-sans`}
      >
        <Toaster position="top-right" richColors />
        <Navbar />
        <main className="flex-grow mt-[100px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
