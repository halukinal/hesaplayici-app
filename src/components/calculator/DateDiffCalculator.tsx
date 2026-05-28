'use client';
import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {calculateDateDiff, type DateDiffResult} from '@/lib/calculators/date-diff';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

const TODAY = new Date().toISOString().split('T')[0];

export default function DateDiffCalculator() {
  const t = useTranslations('dateDiff');
  const tC = useTranslations('common');
  const locale = useLocale();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState(TODAY);
  const [result, setResult] = useState<DateDiffResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    if (!start || !end) { setError(tC('invalidDate')); return; }
    const s = new Date(start), e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) { setError(tC('invalidDate')); return; }
    setResult(calculateDateDiff({startDate: s, endDate: e}));
  }

  const fmtNum = (n: number) => n.toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US');

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="dd-start" className="block font-medium text-[#0F172A] mb-2">{t('startLabel')}</label>
          <input id="dd-start" type="date" value={start} onChange={(e) => {setStart(e.target.value); setResult(null);}}
            className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
        </div>
        <div>
          <label htmlFor="dd-end" className="block font-medium text-[#0F172A] mb-2">{t('endLabel')}</label>
          <input id="dd-end" type="date" value={end} onChange={(e) => {setEnd(e.target.value); setResult(null);}}
            className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
        </div>
      </div>
      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}
      <button type="button" onClick={handleCalculate} disabled={!start}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40">
        {tC('calculate')}
      </button>
      {result && (
        <div className="space-y-3">
          {result.isNegative && (
            <p className="text-sm text-[#F59E0B] bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-4 py-2">{t('reversedNote')}</p>
          )}
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('resultMain'), value: `${result.years} ${t('years')} ${result.months} ${t('months')} ${result.days} ${t('days')}`, primary: true},
            {label: t('totalDays'), value: fmtNum(result.totalDays)},
            {label: t('totalWeeks'), value: fmtNum(result.totalWeeks)},
          ]} />
          <div className="flex justify-end"><FavoriteToggle calculatorId="date-diff" /></div>
        </div>
      )}
    </div>
  );
}
