import type { ProjectionPoint } from "@/types";

export function calculateProportionalSplit(salaryA: number, salaryB: number) {
  const total = salaryA + salaryB;
  if (total === 0) return { pctA: 50, pctB: 50, amountA: 0, amountB: 0 };
  const pctA = (salaryA / total) * 100;
  const pctB = (salaryB / total) * 100;
  return { pctA, pctB, amountA: pctA, amountB: pctB };
}

export function calculateBalance(
  expenses: { amount: number; paidBy: "A" | "B" }[],
  pctA: number,
  pctB: number
) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const fairA = total * (pctA / 100);
  const fairB = total * (pctB / 100);
  const paidA = expenses.filter((e) => e.paidBy === "A").reduce((s, e) => s + e.amount, 0);
  const paidB = expenses.filter((e) => e.paidBy === "B").reduce((s, e) => s + e.amount, 0);
  // positive means A has overpaid, negative means B overpaid
  const balanceA = paidA - fairA;
  const balanceB = paidB - fairB;
  // Who owes whom?
  // if balanceA negative, A owes -balanceA
  return { total, fairA, fairB, paidA, paidB, balanceA, balanceB };
}

export function compoundProjection(
  monthly: number,
  annualRatePct: number,
  years: number
): ProjectionPoint[] {
  const monthlyRate = annualRatePct / 100 / 12;
  const points: ProjectionPoint[] = [];
  for (let y = 0; y <= years; y++) {
    const months = y * 12;
    let total: number;
    if (monthlyRate === 0) total = monthly * months;
    else total = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    // adjust for beginning-of-period? using end-of-period formula above is standard
    const invested = monthly * months;
    const interest = total - invested;
    points.push({
      year: y,
      total: Math.round(total),
      invested: Math.round(invested),
      interest: Math.round(interest),
    });
  }
  return points;
}

export function formatEUR(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatEUR2(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}
