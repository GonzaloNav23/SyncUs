"use client";
import { useStore } from "@/store/useStore";
import { SALARY_PRESETS } from "@/types";
import { calculateProportionalSplit, formatEUR } from "@/lib/calculations";
import { Users, Percent, ArrowLeftRight } from "lucide-react";

export function SalaryConfigurator() {
  const { partnerA, partnerB, setPartnerA, setPartnerB } = useStore();
  const { pctA, pctB } = calculateProportionalSplit(partnerA.salary, partnerB.salary);
  const total = partnerA.salary + partnerB.salary;

  const PresetButtons = ({
    current,
    onPick,
  }: {
    current: number;
    onPick: (v: number) => void;
  }) => (
    <div className="flex flex-wrap gap-1.5">
      {SALARY_PRESETS.map((p) => (
        <button
          key={p.label}
          onClick={() => onPick(p.value)}
          className={`px-2.5 py-1.5 rounded-full text-xs font-medium border transition ${
            current === p.value
              ? "bg-violet-600 text-white border-violet-600 shadow"
              : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-violet-300 dark:hover:border-violet-700"
          }`}
        >
          {p.icon} {p.label} · {p.value}€
        </button>
      ))}
    </div>
  );

  return (
    <section className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-white">Reparto proporcional</h2>
          <p className="text-xs text-zinc-500">Salarios netos · cálculo equitativo automático</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Partner A */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Persona A</label>
          <input
            value={partnerA.name}
            onChange={(e) => setPartnerA({ ...partnerA, name: e.target.value })}
            className="mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Nombre"
          />
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-medium">€</span>
            <input
              type="number"
              value={partnerA.salary}
              onChange={(e) => setPartnerA({ ...partnerA, salary: Number(e.target.value) || 0 })}
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="mt-3">
            <PresetButtons current={partnerA.salary} onPick={(v) => setPartnerA({ ...partnerA, salary: v })} />
          </div>
        </div>

        {/* Partner B */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Persona B</label>
          <input
            value={partnerB.name}
            onChange={(e) => setPartnerB({ ...partnerB, name: e.target.value })}
            className="mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Nombre"
          />
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-medium">€</span>
            <input
              type="number"
              value={partnerB.salary}
              onChange={(e) => setPartnerB({ ...partnerB, salary: Number(e.target.value) || 0 })}
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="mt-3">
            <PresetButtons current={partnerB.salary} onPick={(v) => setPartnerB({ ...partnerB, salary: v })} />
          </div>
        </div>
      </div>

      {/* Result bar */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Percent className="h-3 w-3" /> Reparto justo
          </span>
          <span>Total hogar: {formatEUR(total)}/mes</span>
        </div>

        <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all"
            style={{ width: `${pctA}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
            style={{ width: `${pctB}%` }}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-900/40 p-3">
            <p className="text-xs text-violet-600 dark:text-violet-300 font-semibold">
              {partnerA.name || "A"} · {pctA.toFixed(1)}%
            </p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {formatEUR((total * pctA) / 100)} si gasto = 100%
            </p>
            <p className="text-[11px] text-zinc-500">Ej. alquiler 1200€ → {(1200 * pctA / 100).toFixed(0)}€ / {(1200 * pctB / 100).toFixed(0)}€</p>
          </div>
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 p-3">
            <p className="text-xs text-emerald-600 dark:text-emerald-300 font-semibold">
              {partnerB.name || "B"} · {pctB.toFixed(1)}%
            </p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {formatEUR((total * pctB) / 100)} si gasto = 100%
            </p>
            <p className="text-[11px] text-zinc-500 flex items-center gap-1">
              <ArrowLeftRight className="h-3 w-3" /> Proporcional, no 50/50
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
