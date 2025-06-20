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
  title: {
    default:
      "Ancile Canada Inc - Expert Staffing, Study Abroad & Technology Consulting",
    template: "%s | Ancile Canada Inc",
  },
  description:
    "Your trusted partner for Study Abroad services, expert Staffing & Recruiting services, and Technology Consulting. Find the perfect talents for your project and get expert business advice from industry professionals.",
  keywords: [
    "study abroad",
    "staffing services",
    "recruiting",
    "technology consulting",
    "IT training",
    "staff augmentation",
    "managed services",
    "business consulting",
    "talent acquisition",
    "educational services",
    "NMSDC certified",
  ],
  authors: [{ name: "Ancile Canada Inc" }],
  creator: "Ancile Canada Inc",
  publisher: "Ancile Canada Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ancilecanadainc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Ancile Canada Inc - Expert Staffing, Study Abroad & Technology Consulting",
    description:
      "Your trusted partner for Study Abroad services, expert Staffing & Recruiting services, and Technology Consulting. Find the perfect talents for your project and get expert business advice.",
    url: "https://ancilecanadainc.com",
    siteName: "Ancile Canada Inc",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ancile Canada Inc - Your trusted partner for staffing, study abroad, and technology consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ancile Canada Inc - Expert Staffing, Study Abroad & Technology Consulting",
    description:
      "Your trusted partner for Study Abroad services, expert Staffing & Recruiting services, and Technology Consulting.",
    images: ["/og-image.jpg"],
    creator: "@ancilecanada",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
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
