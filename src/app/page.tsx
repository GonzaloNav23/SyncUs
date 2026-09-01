"use client";
import { Header } from "@/components/Header";
import { SalaryConfigurator } from "@/components/SalaryConfigurator";
import { ExpenseManager } from "@/components/ExpenseManager";
import { DateFund } from "@/components/DateFund";
import { InvestmentSimulator } from "@/components/InvestmentSimulator";
import { GuiltyPleasure } from "@/components/GuiltyPleasure";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero */}
        <div className="rounded-[28px] romance-gradient p-[1.5px] mb-6 shadow-lg">
          <div className="rounded-[26px] romance-gradient px-6 py-6 sm:px-8 sm:py-7 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
              <div>
                <h2 className="text-xl sm:text-[26px] font-black tracking-tight flex flex-wrap items-center gap-2">
                  Finanzas en pareja, <span className="handwriting font-normal text-2xl sm:text-3xl">sin drama</span> <span className="animate-heartbeat">💜</span>
                </h2>
                <p className="text-sm sm:text-[15px] opacity-95 mt-1 max-w-2xl leading-relaxed soft-font">
                  Para <b>Business Analytics 📊 + Teleco 🛰️</b> · reparto con sueldos reales ES, citas con hucha romántica y
                  vuestra libertad financiera con datos del <b>MSCI World, S&P500 y Nasdaq</b> reales.
                </p>
                <p className="handwriting text-lg opacity-90 mt-1">hecho para vosotros dos ✨</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 self-start sm:self-auto">
                <div className="flex items-center gap-2 text-xs font-black bg-white/20 backdrop-blur rounded-full px-4 py-2 soft-font">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /> 100% local · PWA · sin backend
                </div>
                <span className="text-[11px] bg-white text-pink-600 px-3 py-1 rounded-full font-bold soft-font">💑 BA 1.900€ · Teleco 1.750€ · neto/mes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-6">
            <SalaryConfigurator />
            <ExpenseManager />
            <GuiltyPleasure />
          </div>
          {/* Right column */}
          <div className="lg:col-span-5 space-y-6">
            <DateFund />
            <InvestmentSimulator />
            {/* Tips card */}
            <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 p-5 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-pink-100 blur-2xl opacity-40" />
              <h3 className="font-black text-zinc-900 dark:text-white text-sm flex items-center gap-1">
                💡 Cómo funciona <span className="handwriting font-normal text-pink-600 text-base">vuestra</span> proporcionalidad
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed soft-font">
                Si <b>Alex · BA (1.900€)</b> y <b>Sam · Teleco (1.750€)</b> = <b>3.650€</b>, Alex aporta <b>52.1%</b> y Sam <b>47.9%</b>.
                Alquiler 1.200€ → <b>625€ / 575€</b> en lugar de 600/600. Con sueldos medios reales (BA Mid 2.400€ + Teleco 1.960€) sería{" "}
                <b>55% / 45%</b> → 660€/540€.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs soft-font">
                <span className="px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 font-bold border border-pink-100 dark:border-pink-900/30">
                  Método avalado por terapeutas financieros
                </span>
                <span className="px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-bold">
                  Se recalcula en vivo ✨
                </span>
              </div>
              <p className="mt-2 text-[11px] text-zinc-400 soft-font">Fuentes: Jobted, Glassdoor, Laboria, Curvo.eu · ver tooltips en cada chip.</p>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center pb-6">
          <p className="handwriting text-pink-500 text-lg">Hecho con 💜 para parejas que construyen futuro juntas</p>
          <p className="text-xs text-zinc-400 soft-font mt-1">SyncUs v2 · romance + datos reales · BA 📊 + Teleco 🛰️ · Datos guardados en tu navegador</p>
        </footer>
      </main>
    </>
  );
}
