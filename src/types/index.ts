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

// 💖 Mini simulador — PROFESIONES ÚNICAS (sin Jr/Mid/Sr), opcional, ~sueldo debajo
// Neutro 1000 por defecto, sin asignación obligatoria
export const SALARY_PRESETS = [
  { label: "Ingeniería", value: 2100, icon: "🛰️", detail: "27k brutos", source: "Indeed" },
  { label: "Análisis Datos", value: 1800, icon: "📊", detail: "24k brutos", source: "InfoJobs" },
  { label: "Enfermero/a", value: 1800, icon: "👩‍⚕️", detail: "28-35k", source: "OficinaEmpleo" },
  { label: "Docente", value: 1900, icon: "👩‍🏫", detail: "29-35k", source: "BOE" },
  { label: "Desarrollador", value: 2200, icon: "💻", detail: "30k brutos", source: "InfoJobs" },
  { label: "Marketing", value: 1650, icon: "📣", detail: "22-28k", source: "Adecco" },
  { label: "Abogado/a", value: 1600, icon: "⚖️", detail: "21-26k", source: "InfoJobs" },
  { label: "Comercial", value: 1700, icon: "🤝", detail: "23k brutos", source: "Adecco" },
] as const;

export const QUICK_SALARY_PAIRS = [
  { id: "pareja-joven", label: "Pareja joven 💜", a: 1500, b: 1300, note: "22k + 20k" },
  { id: "pareja-media", label: "Pareja media ✨", a: 2100, b: 1800, note: "27k + 24k" },
  { id: "pareja-senior", label: "Pareja senior 🚀", a: 3000, b: 2600, note: "42k + 36k" },
] as const;

// 💹 Rentabilidades reales anualizadas (Curvo.eu, Mitrade, HistoryOfMarket)
export const RETURN_PRESETS = [
  {
    label: "Cuenta Remunerada",
    value: 2.8,
    profile: "conservative" as const,
    desc: "Bajo riesgo",
    realNote: "Cuenta ES 2.5-3%",
    source: "Banco España",
    color: "#94a3b8",
  },
  {
    label: "MSCI World",
    value: 8.4,
    profile: "balanced" as const,
    desc: "Recomendado 🌍",
    realNote: "8.4% EUR 1970-2026",
    source: "Curvo.eu",
    color: "#8b5cf6",
  },
  {
    label: "S&P 500",
    value: 10.3,
    profile: "balanced" as const,
    desc: "USA 500",
    realNote: "10.3% nominal",
    source: "Bankkers",
    color: "#06b6d4",
  },
  {
    label: "Nasdaq 100",
    value: 12.0,
    profile: "aggressive" as const,
    desc: "Tech 🚀",
    realNote: "~12% hist.",
    source: "FondosIndexados",
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

// 🧾 Gastos comunes frecuentes — chips + custom
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
