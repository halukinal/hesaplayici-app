export type WorkDaysMode = 'add' | 'subtract';

export interface WorkDaysInput {
  startDate: Date;
  workDays: number;
  mode: WorkDaysMode;
}

export interface WorkDaysResult {
  resultDate: Date;
  calendarDays: number; // gerçekte kaç takvim günü geçti
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Pazar=0, Cumartesi=6
}

export function calculateWorkDays(input: WorkDaysInput): WorkDaysResult {
  const direction = input.mode === 'add' ? 1 : -1;
  const current = new Date(input.startDate);
  let remaining = Math.abs(input.workDays);
  const startTime = current.getTime();

  while (remaining > 0) {
    current.setDate(current.getDate() + direction);
    if (!isWeekend(current)) {
      remaining -= 1;
    }
  }

  const calendarDays = Math.abs(
    Math.round((current.getTime() - startTime) / 86_400_000)
  );

  return {resultDate: new Date(current), calendarDays};
}
