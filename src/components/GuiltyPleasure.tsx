"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { formatEUR } from "@/lib/calculations";
import { Flame, Cookie, Trash2, TrendingUp } from "lucide-react";

export function GuiltyPleasure() {
  const { partnerA, partnerB, guiltyPleasures, investmentPot, addGuilty, removeGuilty } = useStore();
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [paidBy, setPaidBy] = useState<"A" | "B">("A");

  const submit = () => {
    if (!concept.trim() || !amount) return;
    addGuilty({ concept: concept.trim(), amount: Number(amount), paidBy });
    setConcept("");
    setAmount("");
  };

  return (
    <section className="rounded-[20px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
          <Cookie className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Guilty Pleasure Tax</h2>
          <p className="text-xs text-zinc-500">10% de cada capricho → hucha inversión común</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white px-3 py-2 text-right">
          <p className="text-[10px] uppercase tracking-widest opacity-80 flex items-center gap-1 justify-end">
            <TrendingUp className="h-3 w-3" /> Hucha
          </p>
          <p className="font-black">{formatEUR(investmentPot)}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800/30 p-3 flex items-start gap-2 text-sm">
        <Flame className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-amber-800 dark:text-amber-200 leading-snug">
          Ej.: pides delivery por 28€ → <b>2,80€</b> se destinan automáticamente a inversión conjunta. ¡Capricho con propósito!
        </p>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-2">
        <input
          placeholder="Capricho (ej. Glovo, skins, cañas extra)"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="col-span-7 sm:col-span-5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="number"
          placeholder="€"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="col-span-5 sm:col-span-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="col-span-8 sm:col-span-3 flex rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setPaidBy("A")}
            className={`flex-1 py-2.5 text-xs font-bold ${paidBy === "A" ? "bg-violet-600 text-white" : "bg-white dark:bg-zinc-800 text-zinc-600"}`}
          >
            {partnerA.name || "A"}
          </button>
          <button
            onClick={() => setPaidBy("B")}
            className={`flex-1 py-2.5 text-xs font-bold ${paidBy === "B" ? "bg-emerald-600 text-white" : "bg-white dark:bg-zinc-800 text-zinc-600"}`}
          >
            {partnerB.name || "B"}
          </button>
        </div>
        <button
          onClick={submit}
          className="col-span-4 sm:col-span-1 h-[42px] rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition flex items-center justify-center"
        >
          +10%
        </button>
      </div>
      {amount !== "" && Number(amount) > 0 && (
        <p className="mt-2 text-xs text-zinc-500">
          Impuesto: <b className="text-orange-600">{formatEUR(Number(amount) * 0.1)}</b> → se sumará a la hucha.
        </p>
      )}

      <div className="mt-4 space-y-2 max-h-[220px] overflow-auto pr-1">
        {guiltyPleasures.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-4">Sin caprichos aún. ¡Que siga así! 😇</p>
        ) : (
          guiltyPleasures.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{g.concept}</p>
                <p className="text-xs text-zinc-500">
                  {new Date(g.date).toLocaleDateString("es-ES")} · {g.paidBy === "A" ? partnerA.name : partnerB.name} · {formatEUR(g.amount)} →{" "}
                  <span className="font-bold text-orange-600">+{formatEUR(g.tax)} hucha</span>
                </p>
              </div>
              <button
                onClick={() => removeGuilty(g.id)}
                className="h-8 w-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
