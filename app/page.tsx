import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModuloFinder - Comparatore Case Modulari & Prefabbricate",
  description: "Trova, confronta e acquista case modulari, tiny house e strutture prefabbricate su Amazon. Recensioni esperte e guida all'acquisto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Placeholder per script aggiuntivi se necessario */}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        <Analytics />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
