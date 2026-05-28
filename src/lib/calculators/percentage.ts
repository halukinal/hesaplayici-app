export type PercentageMode = 'findValue' | 'findPercentage' | 'findChange';

export interface PercentageInput {
  mode: PercentageMode;
  value1: number;
  value2: number;
}

export interface PercentageResult {
  result: number;
  mode: PercentageMode;
  value1: number;
  value2: number;
}

export function calculatePercentage(input: PercentageInput): PercentageResult {
  const {mode, value1, value2} = input;
  let result = 0;

  switch (mode) {
    case 'findValue':
      // X'in yüzde Y'si kaçtır? (value1 = X, value2 = Y)
      result = (value1 * value2) / 100;
      break;
    case 'findPercentage':
      // X, Y'nin yüzde kaçıdır? (value1 = X, value2 = Y)
      if (value2 === 0) {
        result = 0; // Sıfıra bölme hatasını önle
      } else {
        result = (value1 / value2) * 100;
      }
      break;
    case 'findChange':
      // X'ten Y'ye yüzde değişim (value1 = X, value2 = Y)
      if (value1 === 0) {
        result = 0;
      } else {
        result = ((value2 - value1) / Math.abs(value1)) * 100;
      }
      break;
  }

  // Yuvarlama: maksimum 4 ondalık hane
  return {
    result: Math.round(result * 10000) / 10000,
    mode,
    value1,
    value2,
  };
}
