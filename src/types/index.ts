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

// 🇪🇸 Sueldos NETOS mensuales reales España 2024-2025
// fuentes: Jobted, Glassdoor, InfoJobs, laboria, Curvo, UFV
export const SALARY_PRESETS = [
  { label: "Junior general", value: 1450, icon: "🌱", detail: "SMI+ · 19k brutos/año", source: "INE" },
  { label: "Docente / Enfermero", value: 1800, icon: "👩‍🏫", detail: "28-35k brutos", source: "OficinaEmpleo" },
  { label: "Business Analytics Jr", value: 1900, icon: "📊", detail: "30-36k brutos · Glassdoor 44k", source: "Glassdoor/Jobted", highlight: true },
  { label: "Business Analytics Mid", value: 2400, icon: "📈", detail: "46k media brutos (HuffPost)", source: "HuffPost/UFV", highlight: true },
  { label: "Ing. Teleco Junior", value: 1750, icon: "📡", detail: "20.6k brutos recién egresado", source: "Jobted" },
  { label: "Ing. Teleco Medio", value: 1960, icon: "🛰️", detail: "36.1k brutos media (1.960€ net)", source: "Jobted", highlight: true },
  { label: "Ing. Teleco Senior", value: 2850, icon: "🚀", detail: "48-59k brutos · hasta 70k", source: "Laboria/Jobted" },
  { label: "Tech Senior / Manager", value: 3500, icon: "💎", detail: "55-65k brutos", source: "InfoJobs" },
] as const;

export const QUICK_SALARY_PAIRS = [
  { id: "pareja-estudio", label: "Vosotros 🎓 BA + Teleco Jr", a: 1900, b: 1750, note: "Inicio carrera, Madrid/BCN" },
  { id: "pareja-media", label: "Media España 👩‍💼👨‍🔧 BA Mid + Teleco Medio", a: 2400, b: 1960, note: "36k + 46k brutos aprox" },
  { id: "pareja-senior", label: "Senior 💎💎 55k + 59k brutos", a: 3000, b: 2850, note: "Sueldos altos" },
] as const;

// 💹 Rentabilidades reales anualizadas (fuentes: Curvo.eu, Mitrade, FondosIndexados.net, Bankkers)
// nominal antes de inflación, con dividendos reinvertidos
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
