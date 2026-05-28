export type VatMode = 'add' | 'remove';

export interface VatInput {
  amount: number;
  vatRate: number; // yüzde, örn. 20 → %20
  mode: VatMode;
}

export interface VatResult {
  net: number;
  vatAmount: number;
  gross: number;
  vatRate: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * KDV hesaplama.
 * add  : net → brüt  (KDV ekle)
 * remove: brüt → net (KDV çıkar)
 * Kaynak: GİB mevzuatı, KDV Kanunu Md. 25-28
 */
export function calculateVat(input: VatInput): VatResult {
  const {amount, vatRate, mode} = input;
  const rate = vatRate / 100;

  if (mode === 'add') {
    const net = amount;
    const vatAmount = net * rate;
    const gross = net + vatAmount;
    return {net: round2(net), vatAmount: round2(vatAmount), gross: round2(gross), vatRate};
  } else {
    const gross = amount;
    const net = gross / (1 + rate);
    const vatAmount = gross - net;
    return {net: round2(net), vatAmount: round2(vatAmount), gross: round2(gross), vatRate};
  }
}
