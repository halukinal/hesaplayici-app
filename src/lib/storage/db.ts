import Dexie, {type Table} from 'dexie';

export interface FavoriteRecord {
  id?: number;
  calculatorId: string;
  addedAt: Date;
}

export interface CalculationRecord {
  id?: number;
  calculatorId: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  savedAt: Date;
}

class HesaplaDB extends Dexie {
  favorites!: Table<FavoriteRecord>;
  records!: Table<CalculationRecord>;

  constructor() {
    super('hesapla-db');
    this.version(1).stores({
      favorites: '++id, calculatorId, addedAt',
      records: '++id, calculatorId, savedAt',
    });
  }
}

export const db = new HesaplaDB();
