"use client";
import { Users, Receipt, Heart, TrendingUp, Cookie } from "lucide-react";

const items = [
  { id: "reparto", label: "Reparto", icon: Users, href: "#reparto" },
  { id: "gastos", label: "Gastos", icon: Receipt, href: "#gastos" },
  { id: "citas", label: "Citas", icon: Heart, href: "#citas" },
  { id: "invertir", label: "Invertir", icon: TrendingUp, href: "#invertir" },
  { id: "capricho", label: "Tax", icon: Cookie, href: "#capricho" },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-pink-100 dark:border-zinc-800 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.href}
            className="flex flex-col items-center gap-1 py-1.5 rounded-xl hover:bg-pink-50 dark:hover:bg-zinc-800 transition"
          >
            <it.icon className="h-5 w-5 text-pink-500" />
            <span className="text-[11px] font-bold soft-font text-zinc-600 dark:text-zinc-300">{it.label}</span>
          </a>
        ))}
      </div>
      <div className="text-center pb-1">
        <span className="text-[10px] soft-font text-zinc-400">PWA instalable · App Store / Play Store ready</span>
      </div>
    </nav>
  );
}
