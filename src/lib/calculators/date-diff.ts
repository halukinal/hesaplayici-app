export interface DateDiffInput {
  startDate: Date;
  endDate: Date;
}

export interface DateDiffResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  isNegative: boolean;
}

export function calculateDateDiff(input: DateDiffInput): DateDiffResult {
  let start = new Date(input.startDate);
  let end = new Date(input.endDate);
  const isNegative = end < start;
  if (isNegative) [start, end] = [end, start];

  const totalMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(totalMs / 86_400_000);
  const totalWeeks = Math.floor(totalDays / 7);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {years, months, days, totalDays, totalWeeks, isNegative};
}
