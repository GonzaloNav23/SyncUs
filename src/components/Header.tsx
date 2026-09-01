"use client";
import { Heart, Moon, Sun, RotateCcw, Wallet } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useStore } from "@/store/useStore";

export function Header() {
  const { theme, toggle } = useTheme();
  const resetAll = useStore((s) => s.resetAll);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Heart className="h-5 w-5 fill-white" />
          </div>
          <div>
            <h1 className="font-bold leading-none tracking-tight text-zinc-900 dark:text-white">SyncUs</h1>
            <p className="text-[11px] font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              Couples Finance Hub
            </p>
          </div>
          <span className="hidden sm:inline-flex ml-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold items-center gap-1">
            <Wallet className="h-3 w-3" /> En vivo · localStorage
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("¿Borrar todos los datos locales y restaurar valores por defecto?")) resetAll();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={toggle}
            className="h-9 w-9 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 flex items-center justify-center hover:opacity-90 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
