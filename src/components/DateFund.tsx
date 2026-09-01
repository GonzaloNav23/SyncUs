"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { formatEUR } from "@/lib/calculations";
import { Heart, Plus, Minus, PiggyBank } from "lucide-react";

export function DateFund() {
  const { dateFund, setMonthlyBudget, addDateFundTx } = useStore();
  const [amount, setAmount] = useState<number | "">("");
  const [concept, setConcept] = useState("");

  const pct = Math.min(100, (dateFund.balance / dateFund.monthlyBudget) * 100);

  return (
    <section className="rounded-[20px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 p-[1px] shadow-sm">
      <div className="rounded-[19px] bg-white dark:bg-zinc-900 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 animate-float">
            <Heart className="h-4 w-4 fill-pink-600 animate-heartbeat" />
          </div>
          <div className="flex-1">
            <h2 className="font-black text-zinc-900 dark:text-white flex items-center gap-1">Bote de Citas <span className="handwriting text-pink-600 font-normal text-lg">sorpresa</span> ✨</h2>
            <p className="text-xs soft-font text-zinc-500">Para cenas y planes sin culpa · vuestra hucha romántica</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Objetivo mes</p>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={dateFund.monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value) || 0)}
                className="w-20 text-right bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1 text-sm font-bold"
              />
              <span className="text-sm font-bold">€</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 text-white p-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-60">Saldo actual</p>
            <p className="text-2xl font-black">{formatEUR(dateFund.balance)}</p>
            <p className="text-xs opacity-60">{pct.toFixed(0)}% del objetivo mensual</p>
          </div>
          <PiggyBank className="h-10 w-10 opacity-20" />
        </div>

        <div className="mt-3 h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-500 to-orange-400 transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-2">
          <input
            placeholder="Concepto (opcional)"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="col-span-7 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="number"
            placeholder="€"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="col-span-5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (!amount) return;
              addDateFundTx({ amount: Number(amount), type: "deposit", concept: concept || "Aportación" });
              setAmount("");
              setConcept("");
            }}
            className="py-2.5 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Aportar
          </button>
          <button
            onClick={() => {
              if (!amount) return;
              addDateFundTx({ amount: Number(amount), type: "withdraw", concept: concept || "Cita" });
              setAmount("");
              setConcept("");
            }}
            className="py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition flex items-center justify-center gap-1.5"
          >
            <Minus className="h-4 w-4" /> Gastar cita
          </button>
        </div>

        {dateFund.transactions.length > 0 && (
          <div className="mt-4 space-y-1.5 max-h-[160px] overflow-auto pr-1">
            {dateFund.transactions.slice(0, 8).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between text-sm px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800"
              >
                <span className="truncate">
                  <span className={t.type === "deposit" ? "text-emerald-600" : "text-pink-600"}>{t.type === "deposit" ? "+ " : "− "}</span>
                  {t.concept}
                </span>
                <span className={`font-bold ${t.type === "deposit" ? "text-emerald-600" : "text-pink-600"}`}>
                  {t.type === "deposit" ? "+" : "-"}
                  {formatEUR(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
