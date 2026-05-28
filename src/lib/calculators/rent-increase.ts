export interface RentIncreaseInput {
  currentRent: number;
  increaseRate: number; // yüzde (örn. 25 → %25)
}

export interface RentIncreaseResult {
  newRent: number;
  increaseAmount: number;
  increasePercent: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// Kaynak: 6098 sayılı TBK Md. 344 — kira artış oranı TÜFE 12 aylık ortalamasını aşamaz.
export function calculateRentIncrease(input: RentIncreaseInput): RentIncreaseResult {
  const increaseAmount = input.currentRent * (input.increaseRate / 100);
  const newRent = input.currentRent + increaseAmount;
  return {
    newRent: round2(newRent),
    increaseAmount: round2(increaseAmount),
    increasePercent: input.increaseRate,
  };
}
