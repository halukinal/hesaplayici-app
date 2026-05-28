export interface AgeInput {
  birthDate: string; // YYYY-MM-DD
  targetDate?: string; // YYYY-MM-DD (varsayılan: bugün)
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  nextBirthdayDays: number | null;
}

export function calculateAge(input: AgeInput): AgeResult {
  const birth = new Date(input.birthDate);
  const target = input.targetDate ? new Date(input.targetDate) : new Date();

  // Saatleri sıfırla ki gün hesaplamaları tam olsun
  birth.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  if (target < birth) {
    throw new Error('Target date cannot be before birth date');
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    // Önceki ayın gün sayısını bul
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const timeDiff = target.getTime() - birth.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Sonraki doğum gününe kalan gün
  let nextBirthdayDays: number | null = null;
  if (!input.targetDate) { // Sadece bugüne göre hesaplanıyorsa anlamlı
    const currentYear = target.getFullYear();
    let nextBirthday = new Date(currentYear, birth.getMonth(), birth.getDate());

    if (nextBirthday < target) {
      nextBirthday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }

    const nextDiff = nextBirthday.getTime() - target.getTime();
    nextBirthdayDays = Math.ceil(nextDiff / (1000 * 60 * 60 * 24));
  }

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    nextBirthdayDays,
  };
}
