import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Kue-KU — Artisanal Christmas Cake & Cookies 2026",
  description:
    "Pemesanan kue kering toples, bolu gulung Yule Log, dan hampers Natal premium dengan 100% mentega Wisman dan keju Edam asli. Pengantaran teratur dan kuota harian terjamin.",
  keywords: [
    "kue natal",
    "nastar wisman",
    "kastengel edam",
    "yule log cake",
    "hampers natal jakarta",
    "kue kering natal",
    "pesan kue natal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-red-800 selection:text-white">
        <Providers>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
