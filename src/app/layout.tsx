import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncUs — Couples Finance & Investment Hub",
  description:
    "Gestiona finanzas en pareja: reparto proporcional según salarios, gastos comunes, bote de citas, simulador de interés compuesto y guilty pleasure tax. 100% local con localStorage, PWA ready.",
  manifest: "/manifest.json",
  keywords: ["finanzas pareja", "presupuesto", "interés compuesto", "ahorro", "PWA", "España"],
  authors: [{ name: "SyncUs" }],
  openGraph: {
    title: "SyncUs — Couples Finance Hub",
    description: "Finanzas en pareja, sin discusiones. Reparto justo, inversión inteligente.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">{children}</body>
    </html>
  );
}
