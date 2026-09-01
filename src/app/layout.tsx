import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat, Outfit, Pacifico, Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800", "900"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "SyncUs — Couples Finance & Investment Hub 💜",
  description:
    "Finanzas en pareja con amor: reparto proporcional según salarios reales ES, bote de citas, simulador con S&P500/Nasdaq/MSCI World reales y guilty pleasure tax. 100% local.",
  manifest: "/manifest.json",
  keywords: ["finanzas pareja", "business analytics sueldo", "ingeniero teleco salario", "S&P500 rentabilidad", "MSCI World", "PWA", "España"],
  authors: [{ name: "SyncUs" }],
  openGraph: {
    title: "SyncUs — Finanzas en pareja, sin drama 💜",
    description: "Vosotros: Business Analytics + Teleco. Reparto justo, inversión con datos reales.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ec4899",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${outfit.variable} ${pacifico.variable} ${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fff7f9] dark:bg-zinc-950 selection:bg-pink-200 selection:text-pink-900">{children}</body>
    </html>
  );
}
