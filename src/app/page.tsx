"use client";
import { Header } from "@/components/Header";
import { SalaryConfigurator } from "@/components/SalaryConfigurator";
import { ExpenseManager } from "@/components/ExpenseManager";
import { DateFund } from "@/components/DateFund";
import { InvestmentSimulator } from "@/components/InvestmentSimulator";
import { GuiltyPleasure } from "@/components/GuiltyPleasure";
import { MobileNav } from "@/components/MobileNav";
import { useStore } from "@/store/useStore";
import { calculateProportionalSplit, formatEUR } from "@/lib/calculations";

export default function Home() {
  const { partnerA, partnerB } = useStore();
  const { pctA, pctB } = calculateProportionalSplit(partnerA.salary, partnerB.salary);
  const total = partnerA.salary + partnerB.salary;
  const nameA = partnerA.name || "Gonzalo";
  const nameB = partnerB.name || "Paula";
  return (
    <>
      <Header />
      {/* fondo animado más vivo y grande */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#fff7f9] dark:bg-zinc-950" />
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-pink-200 via-fuchsia-200 to-violet-200 blur-[80px] opacity-50 animate-float" />
        <div className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-cyan-100 via-teal-100 to-emerald-100 blur-[90px] opacity-40" style={{ animation: "float-heart 5s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-amber-100 via-pink-100 to-rose-100 blur-[100px] opacity-40" style={{ animation: "float-heart 7s ease-in-out infinite reverse" }} />
        <div className="absolute inset-0 romance-gradient opacity-[0.03]" />
      </div>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 text-[15.5px]">
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
                  Reparto proporcional justo, citas con hucha romántica y libertad financiera con <b>MSCI World, S&P500 y Nasdaq</b> reales + backtest.
                  <br />
                  <span className="bg-white text-pink-600 px-2 py-0.5 rounded-full text-xs font-black">Minimiza discusiones, maximiza sueños ✨</span>
                </p>
                <p className="handwriting text-lg opacity-90 mt-1">hecho para vosotros dos por vosotros dos 💑</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 self-start sm:self-auto">
                <div className="flex items-center gap-2 text-xs font-black bg-white/20 backdrop-blur rounded-full px-4 py-2 soft-font">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /> 100% local · PWA · sin backend
                </div>
                <span className="text-[11px] bg-white text-pink-600 px-3 py-1 rounded-full font-bold soft-font">💜 {nameA} & {nameB} · vuestra historia financiera</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-6">
            <div id="reparto"><SalaryConfigurator /></div>
            <div id="gastos"><ExpenseManager /></div>
            <div id="capricho"><GuiltyPleasure /></div>
          </div>
          {/* Right column */}
          <div className="lg:col-span-5 space-y-6">
            <div id="citas"><DateFund /></div>
            <div id="invertir"><InvestmentSimulator /></div>
            {/* Tips card */}
            <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 p-5 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-pink-100 blur-2xl opacity-40" />
              <h3 className="font-black text-zinc-900 dark:text-white text-sm flex items-center gap-1">
                💡 Cómo funciona <span className="handwriting font-normal text-pink-600 text-base">vuestra</span> proporcionalidad
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed soft-font">
                Si <b>{nameA} {formatEUR(partnerA.salary)}</b> y <b>{nameB} {formatEUR(partnerB.salary)}</b> = <b>{formatEUR(total)}</b>, {nameA} aporta <b>{pctA.toFixed(1)}%</b> y {nameB} <b>{pctB.toFixed(1)}%</b>.
                Alquiler 1.200€ → <b>{(1200 * pctA / 100).toFixed(0)}€ / {(1200 * pctB / 100).toFixed(0)}€</b> en lugar de 600/600. Pruébalo con vuestros sueldos arriba: ¡verás la magia del reparto justo!
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

        <footer className="mt-10 text-center pb-24 lg:pb-6">
          <p className="handwriting text-pink-500 text-lg">Hecho con 💜 para {nameA} & {nameB}</p>
          <p className="text-xs text-zinc-400 soft-font mt-1">SyncUs v4 · más vida, más color, más amor · móvil PWA lista para App Store / Play Store</p>
          <p className="text-[11px] text-zinc-400 soft-font mt-2">Instalable: en móvil abre gonzalonav23.github.io/SyncUs → Compartir → Añadir a pantalla de inicio</p>
        </footer>
      </main>
      <MobileNav />
    </>
  );
}
