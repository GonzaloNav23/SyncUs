"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { calculateBalance, calculateProportionalSplit, formatEUR } from "@/lib/calculations";
import { EXPENSE_PRESETS } from "@/types";
import { Receipt, Plus, Trash2, Scale, ArrowRight, Sparkles } from "lucide-react";

export function ExpenseManager() {
  const { partnerA, partnerB, expenses, addExpense, removeExpense } = useStore();
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [paidBy, setPaidBy] = useState<"A" | "B">("A");

  const { pctA, pctB } = calculateProportionalSplit(partnerA.salary, partnerB.salary);
  const bal = calculateBalance(expenses, pctA, pctB);

  const submit = () => {
    if (!concept.trim() || !amount) return;
    addExpense({ concept: concept.trim(), amount: Number(amount), paidBy });
    setConcept("");
    setAmount("");
  };

  const whoOwes = bal.balanceA < 0 ? partnerA.name : partnerB.name;
  const whoIsOwed = bal.balanceA < 0 ? partnerB.name : partnerA.name;
  const oweAmount = Math.abs(bal.balanceA);

  return (
    <section className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
            <Receipt className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-zinc-900 dark:text-white">Gastos comunes</h2>
            <p className="text-xs text-zinc-500">Balance en vivo · quién debe a quién</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-zinc-500">Total este mes</p>
          <p className="font-bold text-zinc-900 dark:text-white">{formatEUR(bal.total)}</p>
        </div>
      </div>

      {/* Presets largos */}
      <div className="mb-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-pink-500" /> Gastos frecuentes <span className="font-normal normal-case soft-font text-pink-500">pulsa para añadir rápido</span>
        </p>
        <div className="flex flex-wrap gap-1.5 max-h-[86px] overflow-auto p-1">
          {EXPENSE_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setConcept(p.label);
                setAmount(p.amount);
              }}
              className={`px-2.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 transition ${
                concept === p.label && amount === p.amount
                  ? "bg-amber-500 text-white border-amber-500 shadow"
                  : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-amber-300 hover:shadow-sm"
              }`}
              title={`${p.category} · ~${p.amount}€`}
            >
              <span>{p.icon}</span> {p.label} <span className="opacity-60">· {p.amount}€</span>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-zinc-400 soft-font mt-1">O escribe uno diferente abajo — puedes añadir cualquier concepto custom.</p>
      </div>
      {/* Quick add */}
      <div className="grid grid-cols-12 gap-2">
        <input
          placeholder="Concepto (ej. Mercadona, Alquiler) o custom"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="col-span-7 sm:col-span-5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          type="number"
          placeholder="€"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="col-span-5 sm:col-span-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <div className="col-span-8 sm:col-span-3 flex rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setPaidBy("A")}
            className={`flex-1 py-2.5 text-xs font-bold transition ${paidBy === "A" ? "bg-violet-600 text-white" : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"}`}
          >
            {partnerA.name || "A"}
          </button>
          <button
            onClick={() => setPaidBy("B")}
            className={`flex-1 py-2.5 text-xs font-bold transition ${paidBy === "B" ? "bg-emerald-600 text-white" : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"}`}
          >
            {partnerB.name || "B"}
          </button>
        </div>
        <button
          onClick={submit}
          className="col-span-4 sm:col-span-1 h-[42px] rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center hover:opacity-90 transition"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Balance card */}
      <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-center py-3">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Pagado {partnerA.name}</p>
            <p className="text-sm font-bold text-violet-600">{formatEUR(bal.paidA)}</p>
            <p className="text-[11px] text-zinc-500">Justo {formatEUR(bal.fairA)}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Scale className="h-4 w-4 text-zinc-400 mb-1" />
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Diferencia</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Pagado {partnerB.name}</p>
            <p className="text-sm font-bold text-emerald-600">{formatEUR(bal.paidB)}</p>
            <p className="text-[11px] text-zinc-500">Justo {formatEUR(bal.fairB)}</p>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="py-6 text-center text-sm text-zinc-500">Aún no hay gastos. ¡Añade el alquiler o la compra!</div>
        ) : oweAmount < 0.5 ? (
          <div className="py-4 text-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
            ✅ ¡Estáis al día! Balance equilibrado.
          </div>
        ) : (
          <div className="py-4 px-4 flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm font-medium flex-wrap">
            <span className="font-bold">{whoOwes}</span> debe <span className="font-bold">{formatEUR(oweAmount)}</span> a{" "}
            <span className="font-bold">{whoIsOwed}</span> <ArrowRight className="h-4 w-4" />
            <button
              onClick={() => {
                if (!confirm(`¿Registrar pago de ${formatEUR(oweAmount)} de ${whoOwes} a ${whoIsOwed}?`)) return;
                // Add an expense that balances: record as if debtor paid the creditor's share
                // simpler: show Bizum text
                alert(`Bizum: ${whoOwes} → ${whoIsOwed} : ${formatEUR(oweAmount)}`);
              }}
              className="ml-2 px-3 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold"
            >
              Liquidar Bizum
            </button>
          </div>
        )}
      </div>

      {/* List */}
      <div className="mt-4 space-y-2 max-h-[320px] overflow-auto pr-1">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium truncate text-zinc-900 dark:text-white">{e.concept}</p>
              <p className="text-xs text-zinc-500">
                {new Date(e.date).toLocaleDateString("es-ES")} · Pagó{" "}
                <span className={e.paidBy === "A" ? "text-violet-600 font-semibold" : "text-emerald-600 font-semibold"}>
                  {e.paidBy === "A" ? partnerA.name : partnerB.name}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatEUR(e.amount)}</span>
              <button
                onClick={() => removeExpense(e.id)}
                className="h-8 w-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
