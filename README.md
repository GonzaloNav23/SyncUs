# 💜 SyncUs — Couples Finance & Investment Hub

<p align="center">
  <img src="public/icon-512.png" width="100" alt="SyncUs logo"/>
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js"/></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TS"/></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind"/></a>
  <a href="https://recharts.org"><img src="https://img.shields.io/badge/Recharts-charts-22b8cf?style=flat-square" alt="Recharts"/></a>
  <img src="https://img.shields.io/badge/PWA-ready-7c3aed?style=flat-square" alt="PWA"/>
  <img src="https://img.shields.io/badge/localStorage-persist-emerald?style=flat-square" alt="localStorage"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT"/>
</p>

> **Finanzas en pareja, sin discusiones.** Reparto proporcional al salario, gastos liquidados al instante, bote para citas y proyección de vuestra libertad financiera.

**🌐 Demo en vivo:** **https://gonzalonav23.github.io/SyncUs/**

![SyncUs preview](https://via.placeholder.com/1200x600/7c3aed/ffffff?text=SyncUs+Preview+%7C+Mobile+First+%2B+Dark+Mode)

---

## ✨ Funcionalidades

### 1. 💰 Configurador de Salarios y Reparto Proporcional
- Inputs para sueldos netos de ambos miembros
- Presets España: **Junior 1.450€**, **Docente/Enfermero 1.800€**, **Tech Mid 2.500€**, **Senior 3.500€** + entrada manual
- Cálculo dinámico automático del % equitativo (ej. 60/40) con barra visual
- Ejemplo contextual: alquiler 1.200€ desglosado según porcentajes

### 2. 🧾 Gestión de Gastos + Bote de Citas
- Registro rápido: **Concepto, Importe, Pagado por (Él/Ella)**
- **Balance en vivo**: quién debe a quién, liquidación vía Bizum en 1 click
- **Bote Citas Sorpresa**: presupuesto mensual, saldo, aportaciones/retiros con historial

### 3. 📈 Módulo de Inversión — Interés Compuesto
- Slider aportación conjunta: **100€ → 1.000€/mes**
- Selectores rentabilidad: **3% (Cuenta)**, **7% (Indexado)**, **10% (Agresivo)** + slider fino 0-12%
- Gráfico interactivo **Recharts (Area stacked)**: capital total vs interés ganado
- Proyección a **3, 5, 10 y 20 años** con KPIs
- Hucha visible alimentada por Guilty Tax

### 4. 🍪 Guilty Pleasure Tax (10%)
- Botón rápido para caprichos individuales (delivery, etc.)
- **10% automático a la hucha de inversión común**
- Historial con eliminación y ajuste de hucha

### 5. 🎨 UX
- **Mobile-first**, tema **claro/oscuro** (persistido), totalmente responsive
- **PWA ready** (`manifest.json`, icons 192/512, themeColor, standalone)
- Persistencia 100% **localStorage vía Zustand persist** — sin backend obligatorio

---

## 🗂 Estructura

```
syncus/
├── public/
│   ├── manifest.json
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Metadata + viewport + fonts
│   │   ├── page.tsx          # Composición dashboard
│   │   └── globals.css       # Tailwind + theme
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SalaryConfigurator.tsx
│   │   ├── ExpenseManager.tsx
│   │   ├── DateFund.tsx
│   │   ├── InvestmentSimulator.tsx
│   │   └── GuiltyPleasure.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── lib/
│   │   └── calculations.ts   # compound, balance, formatEUR
│   ├── store/
│   │   └── useStore.ts       # Zustand + persist
│   └── types/
│       └── index.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Inicio rápido

```bash
# 1. Clonar
git clone https://github.com/GonzaloNav23/SyncUs.git
cd SyncUs

# 2. Instalar
npm install

# 3. Dev
npm run dev
# → http://localhost:3000

# 4. Build producción
npm run build
npm start

# 5. Lint
npm run lint
```

### Requisitos
- Node.js 20+
- npm 10+

---

## ☁️ Despliegue gratis en Vercel

**Opción 1 — Dashboard:**
1. Push a GitHub (`git push origin main`)
2. Entra en [vercel.com/new](https://vercel.com/new) → Import Git Repository
3. Framework detectado: **Next.js** → Deploy (sin env vars necesarias)

**Opción 2 — CLI:**
```bash
npm i -g vercel
vercel
# o producción
vercel --prod
```

> El proyecto es **static-capable** y 100% cliente. No necesita variables de entorno ni base de datos.

---

## 🧠 Decisiones técnicas

| Decisión | Por qué |
|---|---|
| **Zustand + persist** | Ligero, sin boilerplate, persistencia `localStorage` automática |
| **Recharts** | Composable, responsive, tooltip/legend out-of-the-box |
| **Tailwind CSS 4** | Utility-first, dark mode con `dark:` variant |
| **Lucide Icons** | Consistente, tree-shakeable |
| **Geist font** | Optimizado por Vercel, legible en móvil |

### Cálculos clave (`src/lib/calculations.ts`)
- `calculateProportionalSplit`: % = salario / total
- `calculateBalance`: justo = total * %; balance = pagado - justo
- `compoundProjection`: `FV = P * ((1+r)^n -1)/r` con `r=annual/12`

---

## 📱 PWA

- `public/manifest.json` con `display: standalone`, icons maskable
- `theme_color: #7c3aed`
- Instalable en iOS/Android/Desktop desde el navegador (Agregar a pantalla de inicio)

Para soporte offline completo añade `next-pwa` si lo necesitas.

---

## 🔒 Privacidad

Todos los datos quedan en **tu navegador** (`syncus-storage-v1` en localStorage). No se envía nada a servidores. Usa el botón **Reset** del header para borrar todo.

---

## 🛣 Roadmap

- [ ] Exportar/importar JSON + CSV
- [ ] Categorías y presupuestos por categoría
- [ ] Gráfico de gastos mensuales
- [ ] Onboarding para parejas nuevas
- [ ] Supabase opcional para sincronizar entre dispositivos

---

## 📄 Licencia

MIT — Haz lo que quieras, pero comparte el amor 💜

---

<p align="center">Hecho con 💜 para parejas que construyen futuro juntas</p>
