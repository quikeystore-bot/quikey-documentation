import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Quikey Documentation",
    template: "%s — Quikey Docs",
  },
  description:
    "Official documentation for Quikey — the complete e-commerce platform for Bangladesh. Guides for store setup, products, orders, payments, apps, and developer APIs.",
  keywords: ["Quikey", "documentation", "e-commerce", "Bangladesh", "API", "bKash", "Pathao"],
  openGraph: {
    title: "Quikey Documentation",
    description: "Official documentation for Quikey — the complete e-commerce platform.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
