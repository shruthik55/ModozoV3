import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modozo — The Operating System for Fashion Supply Chains",
  description:
    "From techpacks and approvals to vendors, samples, and production tracking — Modozo brings your entire fashion workflow into one connected system.",
  keywords: [
    "fashion supply chain",
    "techpack management",
    "fashion PLM",
    "production tracking",
    "vendor coordination",
    "fashion operations",
    "apparel workflow",
    "fashion technology",
  ],
  authors: [{ name: "Modozo" }],
  openGraph: {
    title: "Modozo — The Operating System for Fashion Supply Chains",
    description:
      "Supercharge your fashion supply chain. One connected system for techpacks, approvals, vendors, samples, and production tracking.",
    type: "website",
    locale: "en_US",
    siteName: "Modozo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modozo — The Operating System for Fashion Supply Chains",
    description:
      "Supercharge your fashion supply chain. One connected system for techpacks, approvals, vendors, samples, and production tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
