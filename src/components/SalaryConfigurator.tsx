"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { SALARY_PRESETS, QUICK_SALARY_PAIRS } from "@/types";
import { calculateProportionalSplit, formatEUR } from "@/lib/calculations";
import { Users, Percent, ArrowLeftRight, Sparkles, Heart, Info } from "lucide-react";

export function SalaryConfigurator() {
  const { partnerA, partnerB, setPartnerA, setPartnerB } = useStore();
  const { pctA, pctB } = calculateProportionalSplit(partnerA.salary, partnerB.salary);
  const total = partnerA.salary + partnerB.salary;
  const [active, setActive] = useState<"A" | "B">("A");

  return (
    <section className="rounded-[28px] bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 shadow-[0_8px_32px_rgba(244,114,182,0.12)] p-5 sm:p-6 relative overflow-hidden">
      {/* romance blurs */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-pink-200 via-fuchsia-200 to-violet-200 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-100 via-pink-100 to-rose-100 blur-3xl opacity-60" />

      <div className="flex items-center gap-3 mb-4 relative">
        <div className="h-10 w-10 rounded-2xl romance-gradient flex items-center justify-center text-white shadow-lg animate-float shrink-0">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2 text-[15px] sm:text-base">
            Reparto proporcional <span className="handwriting text-pink-600 dark:text-pink-400 text-xl font-normal">con amor</span>
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500 animate-heartbeat" />
          </h2>
          <p className="text-xs soft-font text-zinc-500">Salarios netos · toca una profesión y se aplica a quien selecciones. ¡Sin universidades!</p>
        </div>
      </div>

      {/* Gonzalo / Paula */}
      <div className="grid grid-cols-2 gap-3 relative">
        <button
          onClick={() => setActive("A")}
          className={`text-left rounded-3xl p-4 border-2 transition relative overflow-hidden ${active === "A" ? "border-violet-300 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-violet-900/20 dark:to-pink-900/20 shadow-md" : "border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 hover:border-violet-200"}`}
        >
          {active === "A" && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-500 animate-pulse" />}
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-300">Persona A</p>
          <input
            value={partnerA.name}
            onChange={(e) => setPartnerA({ ...partnerA, name: e.target.value })}
            onFocus={() => setActive("A")}
            className="mt-1 w-full bg-white dark:bg-zinc-900 border border-violet-100 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-violet-400 soft-font"
            placeholder="Gonzalo"
          />
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-lg font-black text-violet-600">{partnerA.salary.toLocaleString("es-ES")}</span>
            <span className="text-sm font-bold text-violet-600">€</span>
            <span className="text-[11px] soft-font text-zinc-500">net/mes</span>
          </div>
          <input
            type="range"
            min={1200}
            max={4000}
            step={50}
            value={partnerA.salary}
            onChange={(e) => setPartnerA({ ...partnerA, salary: Number(e.target.value) })}
            onFocus={() => setActive("A")}
            className="w-full mt-2 accent-violet-600"
          />
          <p className="mt-1 text-[11px] soft-font text-zinc-500 flex items-center gap-1">
            <Info className="h-3 w-3" /> {pctA.toFixed(1)}% · {(partnerA.salary * 12 * 1.32).toFixed(0)}€ brutos*
          </p>
        </button>

        <button
          onClick={() => setActive("B")}
          className={`text-left rounded-3xl p-4 border-2 transition relative overflow-hidden ${active === "B" ? "border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-md" : "border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 hover:border-emerald-200"}`}
        >
          {active === "B" && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Persona B</p>
          <input
            value={partnerB.name}
            onChange={(e) => setPartnerB({ ...partnerB, name: e.target.value })}
            onFocus={() => setActive("B")}
            className="mt-1 w-full bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-emerald-400 soft-font"
            placeholder="Paula"
          />
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-lg font-black text-emerald-600">{partnerB.salary.toLocaleString("es-ES")}</span>
            <span className="text-sm font-bold text-emerald-600">€</span>
            <span className="text-[11px] soft-font text-zinc-500">net/mes</span>
          </div>
          <input
            type="range"
            min={1200}
            max={4000}
            step={50}
            value={partnerB.salary}
            onChange={(e) => setPartnerB({ ...partnerB, salary: Number(e.target.value) })}
            onFocus={() => setActive("B")}
            className="w-full mt-2 accent-emerald-500"
          />
          <p className="mt-1 text-[11px] soft-font text-zinc-500 flex items-center gap-1">
            <Info className="h-3 w-3" /> {pctB.toFixed(1)}% · {(partnerB.salary * 12 * 1.32).toFixed(0)}€ brutos*
          </p>
        </button>
      </div>

      {/* mini simulador único — opcional, neutral 1000 */}
      <details className="mt-4 rounded-3xl bg-gradient-to-br from-pink-50 via-violet-50 to-cyan-50 dark:from-zinc-800/60 dark:to-zinc-800/40 border border-pink-100 dark:border-zinc-700 p-3 sm:p-4 group">
        <summary className="list-none flex items-center justify-between cursor-pointer">
          <p className="text-xs font-black tracking-wide text-pink-600 dark:text-pink-300 flex items-center gap-1">
            🎨 Inspiración sueldos reales <span className="handwriting font-normal text-zinc-500 text-sm">opcional — toca si quieres</span>
          </p>
          <span className="text-[11px] soft-font text-zinc-500 group-open:hidden">▶ abrir</span>
          <span className="text-[11px] soft-font text-zinc-500 hidden group-open:inline">▼ cerrar</span>
        </summary>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] soft-font text-zinc-500">Pulsa una profesión y se pone en <b className={active === "A" ? "text-violet-600" : "text-emerald-600"}>{active === "A" ? partnerA.name || "Gonzalo" : partnerB.name || "Paula"}</b> (selecciona arriba). 1000€ es neutro, eliges tú.</p>
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1">
          {SALARY_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                if (active === "A") setPartnerA({ ...partnerA, salary: p.value });
                else setPartnerB({ ...partnerB, salary: p.value });
              }}
              title={`${p.detail} · ${p.source}`}
              className="snap-center shrink-0 w-[108px] rounded-2xl border bg-white dark:bg-zinc-900 border-pink-100 dark:border-zinc-700 hover:border-pink-300 shadow-sm p-2.5 flex flex-col items-center text-center gap-1 transition hover:scale-[1.03] hover:shadow-md"
            >
              <span className="text-xl">{p.icon}</span>
              <span className="text-[11px] font-black leading-tight text-zinc-900 dark:text-white">{p.label}</span>
              <span className="text-xs font-black soft-font px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300">~{p.value}€</span>
              <span className="text-[10px] leading-none text-zinc-400">{p.detail}</span>
            </button>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {QUICK_SALARY_PAIRS.map((pair) => (
            <button
              key={pair.id}
              onClick={() => {
                setPartnerA({ ...partnerA, salary: pair.a });
                setPartnerB({ ...partnerB, salary: pair.b });
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition ${partnerA.salary === pair.a && partnerB.salary === pair.b ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900" : "bg-white dark:bg-zinc-800 border-pink-100 dark:border-zinc-700 hover:border-pink-200"}`}
            >
              {pair.label} · {pair.a} + {pair.b}
            </button>
          ))}
        </div>
      </details>

      {/* Result bar con más vida */}
      <div className="mt-5 relative">
        <div className="flex items-center justify-between text-xs font-black text-zinc-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Percent className="h-3 w-3 text-pink-500" /> Reparto justo
            <span className="handwriting font-normal text-pink-600 text-sm">equitativo, no igual ✨</span>
          </span>
          <span className="soft-font bg-zinc-900 dark:bg-zinc-800 text-white px-2.5 py-1 rounded-full text-[11px]">Hogar {formatEUR(total)}/mes</span>
        </div>

        <div className="h-4 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex p-1 gap-1 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 transition-all relative overflow-hidden flex items-center justify-center text-[10px] font-black text-white"
            style={{ width: `${pctA}%` }}
          >
            {pctA > 18 && `${pctA.toFixed(0)}%`}
            <div className="absolute inset-0 shimmer opacity-25" />
          </div>
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all relative overflow-hidden flex items-center justify-center text-[10px] font-black text-white"
            style={{ width: `${pctB}%` }}
          >
            {pctB > 18 && `${pctB.toFixed(0)}%`}
            <div className="absolute inset-0 shimmer opacity-20" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white p-3.5 shadow-lg relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
            <p className="text-xs font-black opacity-95 flex items-center gap-1">
              {partnerA.name || "Gonzalo"} · {pctA.toFixed(1)}% <Heart className="h-3 w-3 fill-white" />
            </p>
            <p className="text-[13px] font-black">{formatEUR((total * pctA) / 100)} de cada 1.200€</p>
            <p className="text-[11px] opacity-80 soft-font">→ {(1200 * pctA / 100).toFixed(0)}€ tú / {(1200 * pctB / 100).toFixed(0)}€ pareja</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white p-3.5 shadow-lg relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
            <p className="text-xs font-black opacity-95 flex items-center gap-1">
              {partnerB.name || "Paula"} · {pctB.toFixed(1)}% <Sparkles className="h-3 w-3" />
            </p>
            <p className="text-[13px] font-black">{formatEUR((total * pctB) / 100)} de cada 1.200€</p>
            <p className="text-[11px] opacity-80 soft-font flex items-center gap-1">
              <ArrowLeftRight className="h-3 w-3" /> Más justo que 50/50
            </p>
          </div>
        </div>
        <p className="mt-2 text-center handwriting text-pink-500 text-sm">¡Así el amor también es justo! 💜</p>
      </div>
    </section>
  );
}
