"use client";
import { Heart, Moon, Sun, RotateCcw, Wallet, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useStore } from "@/store/useStore";

export function Header() {
  const { theme, toggle } = useTheme();
  const resetAll = useStore((s) => s.resetAll);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/75 dark:bg-zinc-900/70 border-b border-pink-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl romance-gradient flex items-center justify-center text-white shadow-lg animate-float relative">
            <Heart className="h-5 w-5 fill-white animate-heartbeat" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-amber-200 animate-sparkle" />
          </div>
          <div>
            <h1 className="logo-font text-xl leading-none tracking-tight text-zinc-900 dark:text-white flex items-center gap-1">
              SyncUs <span className="handwriting text-pink-500 text-base font-normal">juntos</span>
            </h1>
            <p className="text-[11px] font-bold tracking-widest uppercase text-pink-500 dark:text-pink-300 soft-font flex items-center gap-1">
              Couples Finance Hub <Heart className="h-3 w-3 fill-pink-500" />
            </p>
          </div>
          <span className="hidden sm:inline-flex ml-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-50 to-violet-50 dark:from-pink-900/20 dark:to-violet-900/20 text-pink-700 dark:text-pink-300 text-xs font-bold items-center gap-1 border border-pink-100 dark:border-pink-900/30">
            <Wallet className="h-3 w-3" /> En vivo · local
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("¿Borrar todos los datos y volver a BA 1.900€ + Teleco 1.750€? 💔")) resetAll();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 dark:bg-zinc-800 text-pink-700 dark:text-zinc-300 text-sm font-bold hover:bg-pink-100 dark:hover:bg-zinc-700 transition border border-pink-100 dark:border-zinc-700 soft-font"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={toggle}
            className="h-9 w-9 rounded-xl romance-gradient text-white flex items-center justify-center hover:opacity-90 transition shadow"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
