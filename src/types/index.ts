export type Partner = "A" | "B";

export interface PartnerInfo {
  name: string;
  salary: number;
  color: string;
}

export interface Expense {
  id: string;
  concept: string;
  amount: number;
  paidBy: Partner;
  date: string;
  category?: string;
}

export interface DateFundTransaction {
  id: string;
  amount: number;
  type: "deposit" | "withdraw";
  concept?: string;
  date: string;
}

export interface GuiltyPleasure {
  id: string;
  concept: string;
  amount: number;
  tax: number;
  paidBy: Partner;
  date: string;
}

export type ReturnProfile = "conservative" | "balanced" | "aggressive" | "custom";

export interface InvestmentConfig {
  monthlyContribution: number;
  annualReturn: number; // percentage
  profile: ReturnProfile;
}

export interface ProjectionPoint {
  year: number;
  total: number;
  invested: number;
  interest: number;
}

// 🇪🇸 Mini-simulador de profesiones — sueldos NETOS/mes reales España 2024-2025
// Teleco UCM > Gestión Empresarial Europea (recién egresados, fuentes Indeed/Jobted/WageIndicator vs ESERP/INE)
// Cada chip muestra PROFESIÓN arriba y ~sueldo debajo
export const SALARY_PRESETS = [
  // Teleco Complu
  { label: "Ing. Teleco UCM · Jr", value: 1950, icon: "🛰️", detail: "27k brutos · 22-28k recién graduado Madrid", source: "Indeed/WageIndicator", approx: "~1.950€" },
  { label: "Ing. Teleco UCM · Mid", value: 2650, icon: "📡", detail: "38k brutos · 29-48k rango Madrid", source: "Indeed/Jobted", approx: "~2.650€" },
  { label: "Ing. Teleco UCM · Sr", value: 3400, icon: "🚀", detail: "52k brutos · hasta 60k", source: "Jobted/InfoJobs", approx: "~3.400€", highlight: true },
  // Gestión Empresarial Europea (Business Analytics)
  { label: "Gest. Empresarial Europea · Jr", value: 1550, icon: "📊", detail: "22k brutos · ADE 22-26k inicial", source: "ESERP/INE", approx: "~1.550€" },
  { label: "Gest. Empresarial Europea · Mid", value: 1950, icon: "📈", detail: "27k brutos · 30k media ADE", source: "INE/InfoJobs", approx: "~1.950€" },
  { label: "Gest. Empresarial Europea · Sr", value: 2450, icon: "💼", detail: "36k brutos", source: "Glassdoor", approx: "~2.450€" },
  // Otras profesiones para simular
  { label: "Enfermero/a", value: 1800, icon: "👩‍⚕️", detail: "28-35k brutos", source: "OficinaEmpleo", approx: "~1.800€" },
  { label: "Docente Secundaria", value: 1900, icon: "👩‍🏫", detail: "29-35k brutos", source: "BOE", approx: "~1.900€" },
  { label: "Dev Junior", value: 1750, icon: "💻", detail: "24-30k brutos", source: "InfoJobs", approx: "~1.750€" },
  { label: "Dev Senior", value: 3100, icon: "🧠", detail: "45-60k brutos", source: "InfoJobs", approx: "~3.100€" },
  { label: "Marketing / Comercial", value: 1650, icon: "📣", detail: "22-28k brutos", source: "Adecco", approx: "~1.650€" },
  { label: "Abogado/a Jr", value: 1600, icon: "⚖️", detail: "21-26k brutos", source: "InfoJobs", approx: "~1.600€" },
] as const;

export const QUICK_SALARY_PAIRS = [
  { id: "pareja-real", label: "Vosotros 💜 Teleco UCM + Europea BA Jr", a: 1950, b: 1550, note: "Complu > Europea · recién egresados" },
  { id: "pareja-mid", label: "Mid · Teleco Mid + BA Mid", a: 2650, b: 1950, note: "38k vs 28k brutos" },
  { id: "pareja-senior", label: "Senior 🚀 Teleco Sr + BA Sr", a: 3400, b: 2450, note: "52k vs 36k brutos" },
] as const;

// 💹 Rentabilidades reales anualizadas (Curvo.eu, Mitrade, HistoryOfMarket)
export const RETURN_PRESETS = [
  {
    label: "Cuenta Remunerada",
    value: 2.8,
    profile: "conservative" as const,
    desc: "Bajo riesgo",
    realNote: "Mejor cuenta ES 2025 ~2.5-3% TAE",
    source: "Banco España",
    color: "#94a3b8",
  },
  {
    label: "MSCI World",
    value: 8.4,
    profile: "balanced" as const,
    desc: "Recomendado 🌍",
    realNote: "8.4% CAGR EUR 1970-2026 (Curvo)",
    source: "Curvo.eu · 56 años",
    color: "#8b5cf6",
  },
  {
    label: "S&P 500",
    value: 10.3,
    profile: "balanced" as const,
    desc: "USA · 500 empresas",
    realNote: "10.3% nominal · 8.1% media aritmética 1928-2026",
    source: "Bankkers/HistoryOfMarket",
    color: "#06b6d4",
  },
  {
    label: "Nasdaq 100",
    value: 12.0,
    profile: "aggressive" as const,
    desc: "Tech · volátil 🚀",
    realNote: "~12% histórico · -37% en 2008, +49% en 2023",
    source: "FondosIndexados.net",
    color: "#ec4899",
  },
] as const;

export const RETURN_TABLE = [
  { year: 2024, msci: 19.9, sp500: 25.02, nasdaq: 24.88 },
  { year: 2023, msci: 19.49, sp500: 21.9, nasdaq: 49.32 },
  { year: 2022, msci: -13.08, sp500: -13.04, nasdaq: -28.39 },
  { year: 2021, msci: 31.98, sp500: 39.44, nasdaq: 37.86 },
  { year: 2020, msci: 6.11, sp500: 8.39, nasdaq: 35.93 },
  { year: 2019, msci: 30.12, sp500: 34.01, nasdaq: 41.66 },
] as const;

// 🧾 Gastos comunes frecuentes en pareja España — chips + custom
export const EXPENSE_PRESETS = [
  { label: "Alquiler", amount: 1100, icon: "🏠", category: "Vivienda" },
  { label: "Hipoteca", amount: 850, icon: "🏦", category: "Vivienda" },
  { label: "Luz", amount: 75, icon: "💡", category: "Casa" },
  { label: "Agua", amount: 35, icon: "🚿", category: "Casa" },
  { label: "Internet + Móviles", amount: 65, icon: "📶", category: "Casa" },
  { label: "Mercadona", amount: 280, icon: "🛒", category: "Supermercado" },
  { label: "Transporte / Gasolina", amount: 90, icon: "🚇", category: "Transporte" },
  { label: "Seguro coche", amount: 55, icon: "🚗", category: "Transporte" },
  { label: "Gym", amount: 38, icon: "🏋️", category: "Ocio" },
  { label: "Netflix · Spotify", amount: 22, icon: "🎬", category: "Ocio" },
  { label: "Restaurantes", amount: 120, icon: "🍝", category: "Ocio" },
  { label: "Veterinario", amount: 60, icon: "🐾", category: "Casa" },
  { label: "Ropa", amount: 70, icon: "👕", category: "Personal" },
  { label: "Farmacia / Salud", amount: 40, icon: "💊", category: "Salud" },
  { label: "Peluquería", amount: 25, icon: "💇", category: "Personal" },
  { label: "Bote citas", amount: 80, icon: "💜", category: "Pareja" },
  { label: "Viaje finde", amount: 200, icon: "✈️", category: "Pareja" },
  { label: "Regalo", amount: 45, icon: "🎁", category: "Personal" },
  { label: "Ikea / Hogar", amount: 150, icon: "🛋️", category: "Casa" },
  { label: "Imprevisto", amount: 50, icon: "🛠️", category: "Varios" },
] as const;
