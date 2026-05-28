import {db, type CalculationRecord} from './db';

export async function saveRecord(
  record: Omit<CalculationRecord, 'id' | 'savedAt'>,
) {
  return db.records.add({...record, savedAt: new Date()});
}

export async function getRecordsByCalculator(calculatorId: string) {
  return db.records
    .where('calculatorId')
    .equals(calculatorId)
    .reverse()
    .toArray();
}

export async function getAllRecords() {
  return db.records.orderBy('savedAt').reverse().toArray();
}

export async function deleteRecord(id: number) {
  return db.records.delete(id);
}
