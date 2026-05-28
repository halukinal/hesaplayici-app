export type RoomMode = 'boya' | 'duvar-kagidi';

export interface WallpaintInput {
  mode: RoomMode;
  roomWidth: number;   // metre
  roomLength: number;  // metre
  roomHeight: number;  // metre
  doors: number;       // kapı sayısı (~2m²)
  windows: number;     // pencere sayısı (~1.5m²)
  coats?: number;      // kat sayısı (boya için, varsayılan 2)
}

export interface WallpaintResult {
  wallArea: number;        // net duvar alanı (m²)
  // Boya
  liters?: number;         // gereken boya (litre)
  literCans?: number;      // standart 7.5L kova sayısı
  // Duvar kağıdı
  rolls?: number;          // rulo sayısı (standart 0.53m × 10m = 5.3m²)
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function calculateWallpaint(input: WallpaintInput): WallpaintResult {
  const perimeter = 2 * (input.roomWidth + input.roomLength);
  const grossArea = perimeter * input.roomHeight;
  const openingArea = input.doors * 2 + input.windows * 1.5;
  const wallArea = Math.max(0, grossArea - openingArea);

  if (input.mode === 'boya') {
    const coats = input.coats ?? 2;
    // 1 litre boya ~10m² kapatır (2 kat için 5m²)
    const liters = (wallArea / 10) * coats;
    const literCans = Math.ceil(liters / 7.5);
    return {wallArea: round1(wallArea), liters: round1(liters), literCans};
  } else {
    // Standart rulo: 0.53m × 10m = 5.3m² (fire payıyla ~5m² net)
    const rolls = Math.ceil(wallArea / 5);
    return {wallArea: round1(wallArea), rolls};
  }
}
