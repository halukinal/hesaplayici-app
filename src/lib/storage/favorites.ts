import {db} from './db';

export async function addFavorite(calculatorId: string) {
  const existing = await db.favorites
    .where('calculatorId')
    .equals(calculatorId)
    .first();
  if (existing) return existing.id;
  return db.favorites.add({calculatorId, addedAt: new Date()});
}

export async function removeFavorite(calculatorId: string) {
  return db.favorites.where('calculatorId').equals(calculatorId).delete();
}

export async function isFavorite(calculatorId: string) {
  const record = await db.favorites
    .where('calculatorId')
    .equals(calculatorId)
    .first();
  return !!record;
}

export async function getAllFavorites() {
  return db.favorites.orderBy('addedAt').reverse().toArray();
}
