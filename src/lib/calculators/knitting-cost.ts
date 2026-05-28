export type KnittingMode = 'suggest' | 'profit';

export interface KnittingInput {
  yarnCost: number;
  accessoryCost: number;
  shippingCost: number;
  laborHours: number;
  laborRate: number;
  profitRate?: number; // suggest mode için
  salesPrice?: number; // profit mode için
  mode: KnittingMode;
}

export interface KnittingResult {
  totalCost: number;
  recommendedPrice?: number;
  profit?: number;
  profitRate?: number;
  materialCost: number;
  laborCost: number;
}

export function calculateKnittingCost(input: KnittingInput): KnittingResult {
  const {
    yarnCost,
    accessoryCost,
    shippingCost,
    laborHours,
    laborRate,
    profitRate = 0,
    salesPrice = 0,
    mode,
  } = input;

  const materialCost = yarnCost + accessoryCost;
  const laborCost = laborHours * laborRate;
  const totalCost = materialCost + laborCost + shippingCost;

  const result: KnittingResult = {
    totalCost: Math.round(totalCost * 100) / 100,
    materialCost: Math.round(materialCost * 100) / 100,
    laborCost: Math.round(laborCost * 100) / 100,
  };

  if (mode === 'suggest') {
    result.recommendedPrice = Math.round(totalCost * (1 + profitRate / 100) * 100) / 100;
    result.profit = result.recommendedPrice - totalCost;
    result.profitRate = profitRate;
  } else {
    result.profit = salesPrice - totalCost;
    result.profitRate = totalCost > 0 ? (result.profit / totalCost) * 100 : 0;
    result.recommendedPrice = salesPrice;
  }

  // Yuvarlamalar
  if (result.profit) result.profit = Math.round(result.profit * 100) / 100;
  if (result.profitRate) result.profitRate = Math.round(result.profitRate * 10);

  return result;
}
