export type YarnProject = 'kazak' | 'hirka' | 'atki' | 'bere' | 'eldiven';
export type YarnSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type YarnWeight = 'ince' | 'orta' | 'kalin';

// Tahmini gram ihtiyacı (base: orta kalınlık iplik)
const BASE_GRAMS: Record<YarnProject, Record<YarnSize, number>> = {
  kazak:   {XS: 700, S: 800, M: 950, L: 1100, XL: 1250, XXL: 1400},
  hirka:   {XS: 650, S: 750, M: 900, L: 1050, XL: 1200, XXL: 1350},
  atki:    {XS: 130, S: 150, M: 175, L: 200,  XL: 225,  XXL: 250},
  bere:    {XS: 80,  S: 90,  M: 100, L: 110,  XL: 120,  XXL: 130},
  eldiven: {XS: 90,  S: 110, M: 130, L: 150,  XL: 170,  XXL: 190},
};

const WEIGHT_MULTIPLIER: Record<YarnWeight, number> = {
  ince: 1.25,
  orta: 1.0,
  kalin: 0.75,
};

export interface YarnInput {
  project: YarnProject;
  size: YarnSize;
  yarnWeight: YarnWeight;
  skeinGrams: number; // yumak gramajı (genellikle 50 veya 100g)
}

export interface YarnResult {
  totalGrams: number;
  skeinCount: number;        // tam sayı (yukarı yuvarlanmış)
  skeinCountExtra: number;   // +1 yedek dahil
}

export function calculateYarnAmount(input: YarnInput): YarnResult {
  const base = BASE_GRAMS[input.project][input.size];
  const totalGrams = Math.round(base * WEIGHT_MULTIPLIER[input.yarnWeight]);
  const skeinCount = Math.ceil(totalGrams / input.skeinGrams);
  return {
    totalGrams,
    skeinCount,
    skeinCountExtra: skeinCount + 1,
  };
}
