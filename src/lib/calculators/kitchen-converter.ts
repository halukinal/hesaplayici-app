export type KitchenUnit =
  | 'su-bardagi'      // 200ml
  | 'cay-bardagi'     // 100ml
  | 'yemek-kasigi'    // 15ml
  | 'tatli-kasigi'    // 10ml
  | 'cay-kasigi'      // 5ml
  | 'litre'           // 1000ml
  | 'ml';             // 1ml

export type KitchenIngredient =
  | 'su' | 'sut' | 'un' | 'seker' | 'pudra-sekeri'
  | 'tuz' | 'tereyagi' | 'zeytinyagi' | 'pirinc'
  | 'kakao' | 'nisasta';

export const UNIT_ML: Record<KitchenUnit, number> = {
  'su-bardagi': 200,
  'cay-bardagi': 100,
  'yemek-kasigi': 15,
  'tatli-kasigi': 10,
  'cay-kasigi': 5,
  'litre': 1000,
  'ml': 1,
};

// g/ml (density) for each ingredient
export const INGREDIENT_DENSITY: Record<KitchenIngredient, number> = {
  'su': 1.0,
  'sut': 1.03,
  'un': 0.6,
  'seker': 0.85,
  'pudra-sekeri': 0.56,
  'tuz': 1.2,
  'tereyagi': 0.91,
  'zeytinyagi': 0.91,
  'pirinc': 0.85,
  'kakao': 0.50,
  'nisasta': 0.65,
};

export interface ConversionResult {
  fromAmount: number;
  fromUnit: KitchenUnit;
  totalMl: number;
  conversions: {unit: KitchenUnit; amount: number}[];
  gramsBy?: {ingredient: KitchenIngredient; grams: number}[];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const ALL_UNITS: KitchenUnit[] = [
  'litre', 'su-bardagi', 'cay-bardagi', 'yemek-kasigi', 'tatli-kasigi', 'cay-kasigi', 'ml',
];

export function convertKitchenUnit(
  amount: number,
  fromUnit: KitchenUnit,
  showIngredients?: KitchenIngredient[],
): ConversionResult {
  const totalMl = amount * UNIT_ML[fromUnit];

  const conversions = ALL_UNITS
    .filter((u) => u !== fromUnit)
    .map((unit) => ({unit, amount: round2(totalMl / UNIT_ML[unit])}));

  const gramsBy = showIngredients?.map((ingredient) => ({
    ingredient,
    grams: Math.round(totalMl * INGREDIENT_DENSITY[ingredient]),
  }));

  return {fromAmount: amount, fromUnit, totalMl: round2(totalMl), conversions, gramsBy};
}
