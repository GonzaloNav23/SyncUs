"use client";
import { useStore } from "@/store/useStore";
import { SALARY_PRESETS, QUICK_SALARY_PAIRS } from "@/types";
import { calculateProportionalSplit, formatEUR } from "@/lib/calculations";
import { Users, Percent, ArrowLeftRight, Sparkles, Heart, Info, GraduationCap } from "lucide-react";

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {SALARY_PRESETS.map((p) => (
        <button
          key={p.label}
          onClick={() => onPick(p.value)}
          title={`${p.detail} · fuente: ${p.source}`}
          className={`group relative px-3 py-2 rounded-2xl text-xs font-bold border transition flex flex-col items-center text-center leading-tight ${
            // @ts-ignore highlight prop
            (p as any).highlight ? "ring-1 ring-pink-200" : ""
          } ${
            current === p.value
              ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white border-transparent shadow-md scale-[1.02]"
              : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-sm"
          }`}
        >
          <span className="flex items-center gap-1">
            <span className="text-sm">{p.icon}</span>
            <span className="text-[11px] leading-tight">{p.label}</span>
            {current === p.value && <Sparkles className="h-3 w-3 opacity-80 shrink-0" />}
          </span>
          <span className={`text-[11px] font-black soft-font ${current === p.value ? "text-white" : "text-pink-600 dark:text-pink-400"}`}>
            {/* @ts-ignore */}
            {(p as any).approx ?? `~${p.value}€`}
          </span>
          <span className={`text-[10px] leading-none ${current === p.value ? "text-white/80" : "text-zinc-400"}`}>{p.detail.split("·")[0]}</span>
        </button>
      ))}
    </div>
  );

  return (
    <section className="rounded-[24px] bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 shadow-sm p-5 sm:p-6 relative overflow-hidden confetti">
      {/* decorative blur */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-pink-200 to-violet-200 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-200 to-cyan-200 blur-3xl opacity-30" />

      <div className="flex items-start gap-3 mb-3 relative">
        <div className="h-9 w-9 rounded-xl romance-gradient flex items-center justify-center text-white shadow-md animate-float shrink-0">
          <Users className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h2 className="font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            Reparto proporcional <span className="handwriting text-pink-600 dark:text-pink-400 text-lg font-normal">con amor</span>
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500 animate-heartbeat" />
          </h2>
          <p className="text-xs soft-font text-zinc-500 leading-snug">
            Mini-simulador: elige profesión y ve el sueldo aprox debajo · fuentes: Indeed, Jobted, Glassdoor, WageIndicator{" "}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[11px]">
              <GraduationCap className="h-3 w-3" /> Teleco UCM {'>'} Europea BA
            </span>
          </p>
        </div>
      </div>

      {/* quick pairs */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {QUICK_SALARY_PAIRS.map((pair) => (
          <button
            key={pair.id}
            onClick={() => {
              setPartnerA({ ...partnerA, salary: pair.a });
              setPartnerB({ ...partnerB, salary: pair.b });
            }}
            className={`text-left rounded-2xl border p-3 transition hover:shadow-md ${
              partnerA.salary === pair.a && partnerB.salary === pair.b
                ? "bg-gradient-to-br from-violet-600 to-pink-500 text-white border-transparent shadow"
                : "bg-pink-50/60 dark:bg-zinc-800/50 border-pink-100 dark:border-zinc-700 hover:border-pink-200"
            }`}
          >
            <p className={`text-xs font-bold leading-tight ${partnerA.salary === pair.a && partnerB.salary === pair.b ? "text-white" : "text-zinc-900 dark:text-white"}`}>
              {pair.label}
            </p>
            <p className={`text-[11px] ${partnerA.salary === pair.a && partnerB.salary === pair.b ? "text-pink-100" : "text-zinc-500"}`}>
              {pair.a}€ + {pair.b}€ · {pair.note}
            </p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        {/* Partner A */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-zinc-800/50 dark:to-zinc-800/50 p-4 border border-violet-100 dark:border-zinc-800">
          <label className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300 flex items-center gap-1">
            <span className="h-5 w-5 rounded-full bg-violet-600 text-white grid place-items-center text-[10px]">A</span> Persona A
            <span className="handwriting normal-case tracking-normal text-pink-500 text-sm ml-1">Gonzalo 💜</span>
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              value={partnerA.name}
              onChange={(e) => setPartnerA({ ...partnerA, name: e.target.value })}
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-400 soft-font"
              placeholder="Gonzalo"
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-black text-violet-600">€</span>
            <input
              type="number"
              value={partnerA.salary}
              onChange={(e) => setPartnerA({ ...partnerA, salary: Number(e.target.value) || 0 })}
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <span className="text-[11px] text-zinc-500 soft-font">net/mes</span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500 flex items-center gap-1">
            <Info className="h-3 w-3" /> {partnerA.salary * 12}€ año neto aprox · {(partnerA.salary * 12 * 1.32).toFixed(0)}€ brutos*
          </p>
          <div className="mt-3">
            <PresetButtons current={partnerA.salary} onPick={(v) => setPartnerA({ ...partnerA, salary: v })} />
          </div>
        </div>

        {/* Partner B */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-zinc-800/50 dark:to-zinc-800/50 p-4 border border-emerald-100 dark:border-zinc-800">
          <label className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
            <span className="h-5 w-5 rounded-full bg-emerald-600 text-white grid place-items-center text-[10px]">B</span> Persona B
            <span className="handwriting normal-case tracking-normal text-pink-500 text-sm ml-1">Paula 🛰️</span>
          </label>
          <input
            value={partnerB.name}
            onChange={(e) => setPartnerB({ ...partnerB, name: e.target.value })}
            className="mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 soft-font"
            placeholder="Paula"
          />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-black text-emerald-600">€</span>
            <input
              type="number"
              value={partnerB.salary}
              onChange={(e) => setPartnerB({ ...partnerB, salary: Number(e.target.value) || 0 })}
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <span className="text-[11px] text-zinc-500 soft-font">net/mes</span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500 flex items-center gap-1">
            <Info className="h-3 w-3" /> {partnerB.salary * 12}€ año neto · {(partnerB.salary * 12 * 1.32).toFixed(0)}€ brutos*
          </p>
          <div className="mt-3">
            <PresetButtons current={partnerB.salary} onPick={(v) => setPartnerB({ ...partnerB, salary: v })} />
          </div>
        </div>
      </div>

      {/* Result bar */}
      <div className="mt-5 relative">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Percent className="h-3 w-3" /> Reparto justo
            <span className="handwriting font-normal text-pink-600 text-sm">equitativo, no igualitario ✨</span>
          </span>
          <span className="soft-font">Hogar: {formatEUR(total)}/mes</span>
        </div>

        <div className="h-3.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex p-1 gap-1">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 transition-all relative overflow-hidden"
            style={{ width: `${pctA}%` }}
          >
            <div className="absolute inset-0 shimmer opacity-30" />
          </div>
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all relative overflow-hidden"
            style={{ width: `${pctB}%` }}
          >
            <div className="absolute inset-0 shimmer opacity-20" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white p-3 shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15 blur-xl" />
            <p className="text-xs font-bold opacity-90 flex items-center gap-1">
              {partnerA.name || "A"} · {pctA.toFixed(1)}% <Heart className="h-3 w-3 fill-white" />
            </p>
            <p className="text-sm font-black">{formatEUR((total * pctA) / 100)} si gasto = 100%</p>
            <p className="text-[11px] opacity-80 soft-font">Alquiler 1.200€ → {(1200 * pctA / 100).toFixed(0)}€ / {(1200 * pctB / 100).toFixed(0)}€</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-3 shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15 blur-xl" />
            <p className="text-xs font-bold opacity-90 flex items-center gap-1">
              {partnerB.name || "B"} · {pctB.toFixed(1)}% <Sparkles className="h-3 w-3" />
            </p>
            <p className="text-sm font-black">{formatEUR((total * pctB) / 100)} si gasto = 100%</p>
            <p className="text-[11px] opacity-80 flex items-center gap-1 soft-font">
              <ArrowLeftRight className="h-3 w-3" /> Proporcional, no 50/50
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-zinc-400 text-center soft-font">
          * Estimación brutos 32% sobre neto. Fuentes reales en tooltip de cada chip. Hecho para BA 💜 Teleco
        </p>
      </div>
    </section>
  );
}
