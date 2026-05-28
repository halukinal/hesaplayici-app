export type FabricProject = 'perde' | 'etek' | 'elbise' | 'pantolon' | 'koltuk-kilifi';

export interface FabricInput {
  project: FabricProject;
  // Perde
  curtainWidth?: number;   // cm - raf/ray genişliği
  curtainHeight?: number;  // cm - tavan/perde uzunluğu
  panels?: number;         // kaç kanat
  // Giysi
  hip?: number;            // cm - kalça/basen ölçüsü
  waist?: number;          // cm - bel ölçüsü
  skirtLength?: number;    // cm - etek boyu
  dressHeight?: number;    // cm - elbise boyu
  inseam?: number;         // cm - iç bacak boyu
  // Koltuk kılıfı
  seatWidth?: number;
  seatDepth?: number;
  seatHeight?: number;
}

export interface FabricResult {
  meters: number;          // gereken kumaş metresi
  metersExtra: number;     // +15% pay dahil
  notes: string;           // ek bilgi
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function calculateFabricAmount(input: FabricInput): FabricResult {
  let meters = 0;
  let notes = '';

  switch (input.project) {
    case 'perde': {
      const w = (input.curtainWidth ?? 200) / 100;
      const h = (input.curtainHeight ?? 250) / 100;
      const panels = input.panels ?? 2;
      // Büzgü faktörü 2.5x genişlik
      meters = w * 2.5 * panels + h * 0.3;
      notes = 'Büzgü faktörü 2.5 ile hesaplanmıştır.';
      break;
    }
    case 'etek': {
      const hip = (input.hip ?? 90) + 10;
      const len = (input.skirtLength ?? 70) / 100 + 0.15;
      meters = (hip / 100) * 2 + len;
      notes = 'Bel bandı ve dikiş payları dahildir.';
      break;
    }
    case 'elbise': {
      const hip = (input.hip ?? 90) + 12;
      const len = (input.dressHeight ?? 110) / 100 + 0.15;
      meters = (hip / 100) * 2 * len;
      notes = 'Dar kumaş (90cm en) için hesaplanmıştır.';
      break;
    }
    case 'pantolon': {
      const hip = (input.hip ?? 90) + 10;
      const ins = (input.inseam ?? 75) / 100 + 0.15;
      meters = (hip / 100) * 2 * ins + 0.3;
      notes = 'Cep ve kemer payları dahildir.';
      break;
    }
    case 'koltuk-kilifi': {
      const w = (input.seatWidth ?? 60) / 100;
      const d = (input.seatDepth ?? 55) / 100;
      const h = (input.seatHeight ?? 80) / 100;
      meters = (w * d + w * h * 2 + d * h * 2) * 1.2;
      notes = 'Dikiş payları ve alt kapama dahildir.';
      break;
    }
  }

  return {
    meters: round1(meters),
    metersExtra: round1(meters * 1.15),
    notes,
  };
}
