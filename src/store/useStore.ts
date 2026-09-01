"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Expense, GuiltyPleasure, DateFundTransaction, Partner } from "@/types";

interface AppState {
  partnerA: { name: string; salary: number };
  partnerB: { name: string; salary: number };
  expenses: Expense[];
  dateFund: { balance: number; monthlyBudget: number; transactions: DateFundTransaction[] };
  investment: { monthlyContribution: number; annualReturn: number };
  guiltyPleasures: GuiltyPleasure[];
  investmentPot: number; // accumulated from guilty tax + extra

  // actions
  setPartnerA: (p: { name: string; salary: number }) => void;
  setPartnerB: (p: { name: string; salary: number }) => void;
  addExpense: (e: Omit<Expense, "id" | "date">) => void;
  removeExpense: (id: string) => void;
  setMonthlyBudget: (v: number) => void;
  addDateFundTx: (tx: Omit<DateFundTransaction, "id" | "date">) => void;
  setInvestment: (cfg: { monthlyContribution: number; annualReturn: number }) => void;
  addGuilty: (g: Omit<GuiltyPleasure, "id" | "date" | "tax">) => void;
  removeGuilty: (id: string) => void;
  resetAll: () => void;
}

const initial = {
  partnerA: { name: "Alex · BA", salary: 1900 },
  partnerB: { name: "Sam · Teleco", salary: 1750 },
  expenses: [] as Expense[],
  dateFund: { balance: 120, monthlyBudget: 150, transactions: [] as DateFundTransaction[] },
  investment: { monthlyContribution: 400, annualReturn: 8.4 },
  guiltyPleasures: [] as GuiltyPleasure[],
  investmentPot: 340,
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initial,
      setPartnerA: (p) => set({ partnerA: p }),
      setPartnerB: (p) => set({ partnerB: p }),
      addExpense: (e) =>
        set((s) => ({
          expenses: [
            { id: crypto.randomUUID(), date: new Date().toISOString(), ...e },
            ...s.expenses,
          ],
        })),
      removeExpense: (id) => set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),
      setMonthlyBudget: (v) => set((s) => ({ dateFund: { ...s.dateFund, monthlyBudget: v } })),
      addDateFundTx: (tx) =>
        set((s) => {
          const newTx = { id: crypto.randomUUID(), date: new Date().toISOString(), ...tx };
          const delta = tx.type === "deposit" ? tx.amount : -tx.amount;
          return {
            dateFund: {
              ...s.dateFund,
              balance: s.dateFund.balance + delta,
              transactions: [newTx, ...s.dateFund.transactions],
            },
          };
        }),
      setInvestment: (cfg) => set({ investment: cfg }),
      addGuilty: (g) =>
        set((s) => {
          const tax = Math.round(g.amount * 0.1 * 100) / 100;
          const entry: GuiltyPleasure = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            tax,
            ...g,
          };
          return {
            guiltyPleasures: [entry, ...s.guiltyPleasures],
            investmentPot: s.investmentPot + tax,
          };
        }),
      removeGuilty: (id) =>
        set((s) => {
          const found = s.guiltyPleasures.find((x) => x.id === id);
          return {
            guiltyPleasures: s.guiltyPleasures.filter((x) => x.id !== id),
            investmentPot: found ? s.investmentPot - found.tax : s.investmentPot,
          };
        }),
      resetAll: () => set(initial),
    }),
    {
      name: "syncus-storage-v2",
    }
  )
);
