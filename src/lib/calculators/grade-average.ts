export type GradeSystem = 'lise' | 'universite';

export interface GradeEntry {
  name: string;
  grade: number;
  coefficient: number; // kredi/ağırlık
}

export interface GradeAverageInput {
  grades: GradeEntry[];
  system: GradeSystem;
}

export type GradeCategory =
  | 'basarisiz' | 'gecti' | 'orta' | 'iyi' | 'pekiyi';

export interface GradeAverageResult {
  average: number;
  category: GradeCategory;
  categoryLabel: string; // localized label key
  totalCoefficient: number;
  passed: boolean;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// Lise: 0-44 başarısız, 45-54 geçti, 55-69 orta, 70-84 iyi, 85-100 pekiyi
// Üniversite: 0-49 FF(başarısız), 50-64 DD(geçti), 65-74 CC(orta), 75-84 BB(iyi), 85-100 AA(pekiyi)
function getCategory(avg: number, system: GradeSystem): GradeCategory {
  const thresholds =
    system === 'lise'
      ? [44, 54, 69, 84]
      : [49, 64, 74, 84];

  if (avg <= thresholds[0]) return 'basarisiz';
  if (avg <= thresholds[1]) return 'gecti';
  if (avg <= thresholds[2]) return 'orta';
  if (avg <= thresholds[3]) return 'iyi';
  return 'pekiyi';
}

export function calculateGradeAverage(input: GradeAverageInput): GradeAverageResult {
  if (input.grades.length === 0) {
    return {average: 0, category: 'basarisiz', categoryLabel: 'grade.catBasarisiz', totalCoefficient: 0, passed: false};
  }

  const totalCoefficient = input.grades.reduce((s, g) => s + g.coefficient, 0);
  const weightedSum = input.grades.reduce((s, g) => s + g.grade * g.coefficient, 0);
  const average = totalCoefficient > 0 ? weightedSum / totalCoefficient : 0;
  const cat = getCategory(average, input.system);

  return {
    average: round2(average),
    category: cat,
    categoryLabel: `grade.cat${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
    totalCoefficient: round2(totalCoefficient),
    passed: cat !== 'basarisiz',
  };
}
