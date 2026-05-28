// 2025 Türkiye maaş parametreleri (her yıl güncellenmeli)
const SGK_RATE = 0.14;
const UNEMPLOYMENT_RATE = 0.01;
const SOCIAL_SECURITY_RATE = SGK_RATE + UNEMPLOYMENT_RATE; // 0.15
const STAMP_TAX_RATE = 0.00759;
const MIN_WAGE_GROSS_2025 = 22104; // 2025 H1 asgari ücret (brüt)

// 2025 yıllık gelir vergisi dilimleri (GİB)
const TAX_BRACKETS = [
  {limit: 158_000, rate: 0.15},
  {limit: 330_000, rate: 0.20},
  {limit: 800_000, rate: 0.27},
  {limit: 4_300_000, rate: 0.35},
  {limit: Infinity, rate: 0.40},
];

export type SalaryMode = 'gross-to-net' | 'net-to-gross';

export interface SalaryInput {
  amount: number;
  mode: SalaryMode;
}

export interface SalaryResult {
  gross: number;
  net: number;
  sgk: number;
  unemployment: number;
  incomeTax: number;
  stampTax: number;
  totalDeductions: number;
  employerCost: number; // işveren toplam maliyeti
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function calcAnnualTax(annualIncome: number): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of TAX_BRACKETS) {
    if (annualIncome <= prev) break;
    const taxable = Math.min(annualIncome, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
    if (!isFinite(bracket.limit)) break;
  }
  return tax;
}

function calcNetFromGross(gross: number): SalaryResult {
  const sgk = gross * SGK_RATE;
  const unemployment = gross * UNEMPLOYMENT_RATE;
  const taxBase = gross - sgk - unemployment; // gross × 0.85

  // Asgari ücret muafiyeti: asgari ücretin vergi matrahı kadar tutar vergiden muaf
  const minWageTaxBase = MIN_WAGE_GROSS_2025 * (1 - SOCIAL_SECURITY_RATE);
  const taxableMonthly = Math.max(0, taxBase - minWageTaxBase);
  const annualTax = calcAnnualTax(taxableMonthly * 12);
  const incomeTax = annualTax / 12;

  const stampTax = gross * STAMP_TAX_RATE;
  const totalDeductions = sgk + unemployment + incomeTax + stampTax;
  const net = gross - totalDeductions;

  // İşveren maliyeti: brüt + %19.5 SGK işveren + %2 işsizlik işveren
  const employerSgk = gross * 0.155;
  const employerUnemployment = gross * 0.02;
  const employerCost = gross + employerSgk + employerUnemployment;

  return {
    gross: round2(gross),
    net: round2(net),
    sgk: round2(sgk),
    unemployment: round2(unemployment),
    incomeTax: round2(incomeTax),
    stampTax: round2(stampTax),
    totalDeductions: round2(totalDeductions),
    employerCost: round2(employerCost),
  };
}

// Net → Brüt: binary search (nonlineer denklem)
function calcGrossFromNet(targetNet: number): SalaryResult {
  let lo = targetNet;
  let hi = targetNet * 2;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const result = calcNetFromGross(mid);
    if (result.net < targetNet) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return calcNetFromGross((lo + hi) / 2);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const {amount, mode} = input;
  if (mode === 'gross-to-net') {
    return calcNetFromGross(amount);
  }
  return calcGrossFromNet(amount);
}
