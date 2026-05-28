// 2025 Türkiye elektrik tarifeleri (TL/kWh) — ortalama tek faz
export const TARIFF_PRESETS = {
  konut: 4.5,    // Konut
  ticarethane: 8.5, // Ticarethane
} as const;

export interface ElectricityInput {
  watts: number;
  hoursPerDay: number;
  tariff: number;         // TL/kWh
  daysPerMonth?: number;  // varsayılan 30
}

export interface ElectricityResult {
  dailyKwh: number;
  monthlyKwh: number;
  annualKwh: number;
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calculateElectricityBill(input: ElectricityInput): ElectricityResult {
  const days = input.daysPerMonth ?? 30;
  const dailyKwh = (input.watts / 1000) * input.hoursPerDay;
  const monthlyKwh = dailyKwh * days;
  const annualKwh = dailyKwh * 365;

  const dailyCost = dailyKwh * input.tariff;
  const monthlyCost = monthlyKwh * input.tariff;
  const annualCost = annualKwh * input.tariff;

  return {
    dailyKwh: round2(dailyKwh),
    monthlyKwh: round2(monthlyKwh),
    annualKwh: round2(annualKwh),
    dailyCost: round2(dailyCost),
    monthlyCost: round2(monthlyCost),
    annualCost: round2(annualCost),
  };
}
