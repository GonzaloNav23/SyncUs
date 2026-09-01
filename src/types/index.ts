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

export const SALARY_PRESETS = [
  { label: "Junior", value: 1450, icon: "🌱" },
  { label: "Docente / Enfermero", value: 1800, icon: "👩‍🏫" },
  { label: "Tech Mid", value: 2500, icon: "💻" },
  { label: "Senior", value: 3500, icon: "🚀" },
] as const;

export const RETURN_PRESETS = [
  { label: "Cuenta Remunerada", value: 3, profile: "conservative" as const, desc: "Bajo riesgo" },
  { label: "Fondo Indexado", value: 7, profile: "balanced" as const, desc: "Recomendado" },
  { label: "Cartera Agresiva", value: 10, profile: "aggressive" as const, desc: "Alto riesgo" },
];
