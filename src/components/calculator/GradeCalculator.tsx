'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateGradeAverage, type GradeSystem, type GradeEntry, type GradeAverageResult} from '@/lib/calculators/grade-average';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {Plus, Trash2} from 'lucide-react';

interface GradeRow { id: number; name: string; grade: string; coefficient: string; }

let nextId = 1;
const defaultRows = (): GradeRow[] => [
  {id: nextId++, name: 'Matematik', grade: '', coefficient: '3'},
  {id: nextId++, name: 'Türkçe', grade: '', coefficient: '3'},
];

export default function GradeCalculator() {
  const t = useTranslations('grade');
  const tC = useTranslations('common');
  const [system, setSystem] = useState<GradeSystem>('lise');
  const [rows, setRows] = useState<GradeRow[]>(defaultRows());
  const [result, setResult] = useState<GradeAverageResult | null>(null);

  function addRow() { setRows((r) => [...r, {id: nextId++, name: '', grade: '', coefficient: '3'}]); }
  function removeRow(id: number) { setRows((r) => r.filter((x) => x.id !== id)); setResult(null); }
  function updateRow(id: number, field: keyof GradeRow, val: string) {
    setRows((r) => r.map((x) => x.id === id ? {...x, [field]: val} : x));
    setResult(null);
  }

  function handleCalculate() {
    const grades: GradeEntry[] = rows
      .map((r) => ({name: r.name || '-', grade: parseFloat(r.grade), coefficient: parseFloat(r.coefficient)}))
      .filter((g) => !isNaN(g.grade) && !isNaN(g.coefficient));
    if (grades.length === 0) return;
    setResult(calculateGradeAverage({grades, system}));
  }

  const catColors: Record<string, string> = {
    basarisiz: 'text-[#EF4444]', gecti: 'text-[#F59E0B]',
    orta: 'text-[#64748B]', iyi: 'text-[#10B981]', pekiyi: 'text-[#2563EB]',
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('systemLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['lise', 'universite'] as const).map((s) => (
            <button key={s} type="button" onClick={() => {setSystem(s); setResult(null);}} aria-pressed={system === s}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-colors ${system === s ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(s === 'lise' ? 'systemHigh' : 'systemUni')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-1 text-xs font-medium text-[#64748B] px-1">
          <span className="col-span-5">{t('courseName')}</span>
          <span className="col-span-3">{t('gradeLabel')}</span>
          <span className="col-span-3">{t('coefficientLabel')}</span>
          <span className="col-span-1"></span>
        </div>
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-12 gap-1 items-center">
            <input value={row.name} onChange={(e) => updateRow(row.id, 'name', e.target.value)}
              placeholder={t('courseName')}
              className="col-span-5 h-11 px-2 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-sm text-[#0F172A]" />
            <input type="number" inputMode="decimal" value={row.grade} onChange={(e) => updateRow(row.id, 'grade', e.target.value)}
              placeholder="0-100"
              className="col-span-3 h-11 px-2 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-sm font-medium text-[#0F172A]" />
            <input type="number" inputMode="decimal" value={row.coefficient} onChange={(e) => updateRow(row.id, 'coefficient', e.target.value)}
              placeholder="3"
              className="col-span-3 h-11 px-2 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-sm font-medium text-[#0F172A]" />
            <button type="button" onClick={() => removeRow(row.id)}
              className="col-span-1 h-11 flex items-center justify-center text-[#94A3B8] hover:text-[#EF4444] transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addRow}
          className="flex items-center gap-2 text-[#2563EB] font-medium text-sm py-2 hover:underline">
          <Plus size={16} /> {t('addCourse')}
        </button>
      </div>

      <button type="button" onClick={handleCalculate}
        disabled={rows.every((r) => !r.grade)}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40">
        {tC('calculate')}
      </button>

      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('average'), value: `${result.average}`, primary: true},
            {label: t('category'), value: t(result.categoryLabel as Parameters<typeof t>[0])},
          ]} />
          <div className={`text-center text-lg font-bold py-2 rounded-xl ${catColors[result.category] ?? ''}`}>
            {result.passed ? '✓ ' : '✗ '}{t(result.categoryLabel as Parameters<typeof t>[0])}
          </div>
          <div className="flex justify-end"><FavoriteToggle calculatorId="grade-average" /></div>
        </div>
      )}
    </div>
  );
}
