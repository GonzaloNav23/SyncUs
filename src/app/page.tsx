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
        <div className="rounded-[24px] bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 p-[1px] mb-6">
          <div className="rounded-[23px] bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 px-6 py-6 sm:px-8 sm:py-7 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">Finanzas en pareja, sin drama 💜</h2>
                <p className="text-sm sm:text-[15px] opacity-90 mt-1 max-w-2xl leading-relaxed">
                  Reparto proporcional al salario, gastos liquidados al instante, citas con presupuesto y vuestra futura libertad
                  financiera visualizada.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/15 backdrop-blur rounded-full px-4 py-2 self-start sm:self-auto">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> 100% local · sin backend · PWA
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
            <div className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">💡 Cómo funciona el reparto proporcional</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Si <b>Alex</b> gana 2.500€ y <b>Sam</b> 1.800€ (total 4.300€), Alex aporta el{" "}
                <b>58,1%</b> y Sam el <b>41,9%</b> de cada gasto común. Un alquiler de 1.200€ se divide en{" "}
                <b>697€ / 503€</b> en lugar de 600/600. Más justo, menos fricción.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium">
                  Método avalado por terapeutas financieros
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium">
                  Se recalcula en vivo
                </span>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-zinc-400 pb-6">
          Hecho con 💜 para parejas que construyen futuro juntas · SyncUs v1.0 · Datos guardados localmente en tu navegador
        </footer>
      </main>
    </>
  );
}
