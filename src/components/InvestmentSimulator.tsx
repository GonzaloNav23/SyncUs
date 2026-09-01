"use client";
import { useMemo, useState } from "react";
import { useStore } from "@/store/useStore";
import { compoundProjection, formatEUR } from "@/lib/calculations";
import { RETURN_PRESETS } from "@/types";
import { TrendingUp, PiggyBank, Sparkles } from "lucide-react";
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

  return (
    <section className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Simulador interés compuesto</h2>
          <p className="text-xs text-zinc-500">Aportación conjunta mensual + rentabilidad estimada</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold">
          <PiggyBank className="h-3 w-3" /> Hucha {formatEUR(investmentPot)}
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Aportación mensual conjunta
          </label>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-zinc-900 dark:text-white">{investment.monthlyContribution}€</span>
            <span className="text-xs text-zinc-500">/mes</span>
          </div>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={investment.monthlyContribution}
            onChange={(e) => setInvestment({ ...investment, monthlyContribution: Number(e.target.value) })}
            className="w-full mt-3 accent-violet-600"
          />
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>100€</span>
            <span>1.000€</span>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            {investment.monthlyContribution * 12}€ al año · {formatEUR(investment.monthlyContribution * 12 * 10)} en 10 años solo aportado
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Rentabilidad anual</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {RETURN_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setInvestment({ ...investment, annualReturn: p.value })}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition text-left ${
                  investment.annualReturn === p.value
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-emerald-300"
                }`}
              >
                <div>{p.label}</div>
                <div className={`text-[11px] ${investment.annualReturn === p.value ? "text-emerald-100" : "text-zinc-500"}`}>
                  {p.value}% · {p.desc}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={investment.annualReturn}
              onChange={(e) => setInvestment({ ...investment, annualReturn: Number(e.target.value) })}
              className="flex-1 accent-emerald-600"
            />
            <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm font-bold">
              {investment.annualReturn}%
            </span>
          </div>
        </div>
      </div>

      {/* Year selector pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[3, 5, 10, 20].map((y) => (
          <button
            key={y}
            onClick={() => setYears(y as any)}
            className={`px-4 py-2 rounded-full text-sm font-bold border transition ${
              years === y
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white"
                : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300"
            }`}
          >
            {y} años
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white p-4">
          <p className="text-[11px] uppercase tracking-widest opacity-60">Capital final</p>
          <p className="text-xl font-black">{formatEUR(selected.total)}</p>
          <p className="text-xs opacity-60">en {years} años</p>
        </div>
        <div className="rounded-2xl bg-violet-600 text-white p-4">
          <p className="text-[11px] uppercase tracking-widest opacity-80">Aportado</p>
          <p className="text-xl font-black">{formatEUR(selected.invested)}</p>
          <p className="text-xs opacity-80">{((selected.invested / selected.total) * 100 || 0).toFixed(0)}% del total</p>
        </div>
        <div className="rounded-2xl bg-emerald-600 text-white p-4">
          <p className="text-[11px] uppercase tracking-widest opacity-80 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Interés
          </p>
          <p className="text-xl font-black">{formatEUR(selected.interest)}</p>
          <p className="text-xs opacity-80">Magia compuesta ✨</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5 h-[280px] w-full rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}a`} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={45} />
            <Tooltip
              formatter={(value: any, name: any) => [formatEUR(Number(value)), name === "invested" ? "Aportado" : name === "interest" ? "Interés" : "Total"]}
              labelFormatter={(l) => `Año ${l}`}
              contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7" }}
            />
            <Legend />
            <Area type="monotone" dataKey="invested" stackId="1" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} name="Aportado" />
            <Area type="monotone" dataKey="interest" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.35} name="Interés" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {[3, 5, 10, 20].map((y) => {
          const p = data.find((d) => d.year === y)!;
          return (
            <div
              key={y}
              className={`rounded-xl border p-2.5 ${years === y ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}
            >
              <p className="text-xs font-bold">{y} años</p>
              <p className="text-xs text-zinc-500">{formatEUR(p.total)}</p>
              <p className="text-[11px] text-emerald-600">+{formatEUR(p.interest)} interés</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
