"use client";
import { useMemo, useState } from "react";
import { useStore } from "@/store/useStore";
import { compoundProjection, formatEUR } from "@/lib/calculations";
import { RETURN_PRESETS, RETURN_TABLE } from "@/types";
import { TrendingUp, PiggyBank, Sparkles, Heart, Info, BarChart3, Gem } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export function InvestmentSimulator() {
  const { investment, setInvestment, investmentPot } = useStore();
  const [years, setYears] = useState<3 | 5 | 10 | 20>(10);

  const data = useMemo(
    () => compoundProjection(investment.monthlyContribution, investment.annualReturn, 20),
    [investment.monthlyContribution, investment.annualReturn]
  );

  const selected = data.find((d) => d.year === years)!;
  const chartData = data.filter((d) => d.year % 1 === 0);
  const activePreset = RETURN_PRESETS.find((p) => p.value === investment.annualReturn);

  return (
    <section className="rounded-[24px] bg-white dark:bg-zinc-900 border border-violet-100 dark:border-zinc-800 shadow-sm p-5 sm:p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-violet-200 via-pink-200 to-cyan-200 blur-3xl opacity-30" />
      <div className="flex items-center gap-2 mb-4 relative">
        <div className="h-9 w-9 rounded-xl romance-gradient flex items-center justify-center text-white shadow-md animate-float">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h2 className="font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            Simulador <span className="handwriting text-pink-600 dark:text-pink-400 text-lg font-normal">interés compuesto</span>
            <Sparkles className="h-4 w-4 text-amber-500 animate-sparkle" />
          </h2>
          <p className="text-xs soft-font text-zinc-500">
            Datos reales: MSCI World 8.4% (Curvo 56a) · S&P500 10.3% · Nasdaq 12% · con dividendos
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full romance-gradient text-white text-xs font-black shadow">
          <PiggyBank className="h-3 w-3" /> Hucha {formatEUR(investmentPot)} <Heart className="h-3 w-3 fill-white" />
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 dark:from-zinc-800/50 dark:to-zinc-800/50 p-4 border border-violet-100 dark:border-zinc-800">
          <label className="text-xs font-black uppercase tracking-widest text-violet-600 dark:text-violet-300 flex items-center gap-1">
            <Gem className="h-3 w-3" /> Aportación conjunta
          </label>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">{investment.monthlyContribution}€</span>
            <span className="text-xs soft-font text-zinc-500">/mes · juntos</span>
            <span className="ml-auto handwriting text-pink-600 text-sm">vosotros 💑</span>
          </div>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={investment.monthlyContribution}
            onChange={(e) => setInvestment({ ...investment, monthlyContribution: Number(e.target.value) })}
            className="w-full mt-3 accent-pink-500"
          />
          <div className="flex justify-between text-[11px] soft-font text-zinc-500">
            <span>100€</span>
            <span className="handwriting text-pink-500">más amor = más futuro</span>
            <span>1.000€</span>
          </div>
          <p className="mt-2 text-xs soft-font text-zinc-600 dark:text-zinc-400">
            {investment.monthlyContribution * 12}€/año · {formatEUR(investment.monthlyContribution * 12 * 10)} en 10 años solo aportado
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1">
            <BarChart3 className="h-3 w-3" /> Rentabilidad anual real
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {RETURN_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setInvestment({ ...investment, annualReturn: p.value })}
                title={`${p.realNote} · Fuente: ${p.source}`}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition text-left relative overflow-hidden ${
                  investment.annualReturn === p.value
                    ? "text-white border-transparent shadow-md"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-pink-200 hover:shadow-sm"
                }`}
                style={investment.annualReturn === p.value ? { background: p.color } : {}}
              >
                {investment.annualReturn === p.value && <span className="absolute inset-0 shimmer opacity-20" />}
                <div className="relative flex items-center gap-1">
                  {p.label} {investment.annualReturn === p.value && <Heart className="h-3 w-3 fill-white" />}
                </div>
                <div className={`text-[11px] relative ${investment.annualReturn === p.value ? "text-white/90" : "text-zinc-500"}`}>
                  {p.value}% · {p.desc}
                </div>
                <div className={`text-[10px] leading-tight mt-0.5 relative ${investment.annualReturn === p.value ? "text-white/70" : "text-zinc-400"}`}>
                  {p.realNote}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={12}
              step={0.1}
              value={investment.annualReturn}
              onChange={(e) => setInvestment({ ...investment, annualReturn: Number(e.target.value) })}
              className="flex-1 accent-violet-600"
            />
            <span className="px-2.5 py-1 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 text-white text-sm font-black shadow">
              {investment.annualReturn}%
            </span>
          </div>
          {activePreset && (
            <p className="mt-1.5 text-[11px] soft-font text-zinc-500 flex items-center gap-1">
              <Info className="h-3 w-3" /> Fuente: <b>{activePreset.source}</b> · {activePreset.realNote}
            </p>
          )}
          {!activePreset && (
            <p className="mt-1.5 text-[11px] soft-font text-amber-600">Valor personalizado · ¡prueba 8.4% para MSCI World!</p>
          )}
        </div>
      </div>

      {/* small real table */}
      <details className="mt-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 p-3">
        <summary className="text-xs font-bold cursor-pointer list-none flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            📊 Rentabilidades reales últimos 6 años <span className="handwriting font-normal text-pink-600">para que no te vendan humo</span>
          </span>
          <span className="text-[11px] text-zinc-500 soft-font">Curvo/Mitrade · click para ver</span>
        </summary>
        <div className="mt-2 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 soft-font">
                <th className="text-left py-1">Año</th>
                <th className="text-right">MSCI World</th>
                <th className="text-right">S&P 500</th>
                <th className="text-right">Nasdaq 100</th>
              </tr>
            </thead>
            <tbody>
              {RETURN_TABLE.map((r) => (
                <tr key={r.year} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="py-1 font-bold">{r.year}</td>
                  <td className={`text-right ${r.msci < 0 ? "text-red-500" : "text-emerald-600"}`}>{r.msci > 0 ? "+" : ""}{r.msci}%</td>
                  <td className={`text-right ${r.sp500 < 0 ? "text-red-500" : "text-cyan-600"}`}>{r.sp500 > 0 ? "+" : ""}{r.sp500}%</td>
                  <td className={`text-right ${r.nasdaq < 0 ? "text-red-500" : "text-pink-600"}`}>{r.nasdaq > 0 ? "+" : ""}{r.nasdaq}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-1 text-[11px] text-zinc-400 soft-font">
            CAGR largo plazo: MSCI 8.4% (EUR, 1969-2026), S&P500 ~10% (1928-2026 media aritm. 8.1%), Nasdaq ~12%. 2022 fue -13% para casi todos (¡volatilidad!).
          </p>
        </div>
      </details>

      {/* Year selector pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[3, 5, 10, 20].map((y) => (
          <button
            key={y}
            onClick={() => setYears(y as any)}
            className={`px-4 py-2 rounded-full text-sm font-black border transition flex items-center gap-1 ${
              years === y
                ? "romance-gradient text-white border-transparent shadow-md"
                : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-pink-200"
            }`}
          >
            {years === y && <Heart className="h-3 w-3 fill-white" />}
            {y} años
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white p-4 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
          <p className="text-[11px] uppercase tracking-widest opacity-60 soft-font">Capital final</p>
          <p className="text-xl font-black">{formatEUR(selected.total)}</p>
          <p className="text-xs opacity-60 soft-font">en {years} años · juntos</p>
        </div>
        <div className="rounded-2xl romance-gradient text-white p-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-20" />
          <p className="text-[11px] uppercase tracking-widest opacity-80 soft-font relative">Aportado 💜</p>
          <p className="text-xl font-black relative">{formatEUR(selected.invested)}</p>
          <p className="text-xs opacity-80 soft-font relative">{((selected.invested / selected.total) * 100 || 0).toFixed(0)}% del total</p>
        </div>
        <div className="rounded-2xl bg-emerald-600 text-white p-4 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15 blur-xl" />
          <p className="text-[11px] uppercase tracking-widest opacity-80 flex items-center gap-1 soft-font">
            <Sparkles className="h-3 w-3" /> Interés
          </p>
          <p className="text-xl font-black">{formatEUR(selected.interest)}</p>
          <p className="text-xs opacity-80 soft-font">Magia compuesta ✨</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5 h-[300px] w-full rounded-2xl border border-violet-100 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-pink-50/40 dark:from-zinc-800/20 dark:to-zinc-900 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" opacity={0.35} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#a1a1aa" }} tickFormatter={(v) => `${v}a`} />
            <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={45} />
            <Tooltip
              formatter={(value: any, name: any) => [formatEUR(Number(value)), name === "invested" ? "Aportado" : name === "interest" ? "Interés ✨" : "Total"]}
              labelFormatter={(l) => `Año ${l} · juntos`}
              contentStyle={{ borderRadius: 16, border: "1px solid #f9a8d4", fontFamily: "var(--font-quicksand)" }}
            />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-quicksand)" }} />
            <Area type="monotone" dataKey="invested" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.18} name="Aportado" />
            <Area type="monotone" dataKey="interest" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.32} name="Interés" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {[3, 5, 10, 20].map((y) => {
          const p = data.find((d) => d.year === y)!;
          return (
            <div
              key={y}
              className={`rounded-xl border p-2.5 transition ${years === y ? "romance-gradient text-white border-transparent shadow-md" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-pink-200"}`}
            >
              <p className={`text-xs font-black ${years === y ? "text-white" : ""}`}>{y} años</p>
              <p className={`text-xs ${years === y ? "text-pink-100" : "text-zinc-500"}`}>{formatEUR(p.total)}</p>
              <p className={`text-[11px] font-bold ${years === y ? "text-white" : "text-emerald-600"}`}>+{formatEUR(p.interest)} ✨</p>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-center handwriting text-pink-500 text-sm">
        Cada mes juntos es una semilla 🌱 — en 20 años, ¡vuestra historia también da frutos!
      </p>
    </section>
  );
}
