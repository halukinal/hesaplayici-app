'use client';
import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {calculateWorkDays, type WorkDaysMode, type WorkDaysResult} from '@/lib/calculators/work-days';
import {workDaysSchema} from '@/lib/validation/work-days';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

const TODAY = new Date().toISOString().split('T')[0];

export default function WorkDaysCalculator() {
  const t = useTranslations('workDays');
  const tC = useTranslations('common');
  const locale = useLocale();
  const [mode, setMode] = useState<WorkDaysMode>('add');
  const [startDate, setStartDate] = useState(TODAY);
  const [workDaysStr, setWorkDaysStr] = useState('');
  const [result, setResult] = useState<WorkDaysResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    const parse = workDaysSchema.safeParse({startDate, workDays: parseInt(workDaysStr), mode});
    if (!parse.success) { setError(tC('invalidAmount')); return; }
    setResult(calculateWorkDays({startDate: new Date(startDate), workDays: parse.data.workDays, mode}));
  }

  const dateStr = result?.resultDate.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('modeLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['add', 'subtract'] as const).map((m) => (
            <button key={m} type="button" onClick={() => {setMode(m); setResult(null);}} aria-pressed={mode === m}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-base transition-colors ${mode === m ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(m === 'add' ? 'modeAdd' : 'modeSubtract')}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="wd-start" className="block font-medium text-[#0F172A] mb-2">{t('startLabel')}</label>
        <input id="wd-start" type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value); setResult(null);}}
          className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
      </div>
      <div>
        <label htmlFor="wd-days" className="block font-medium text-[#0F172A] mb-2">{t('workDaysLabel')}</label>
        <input id="wd-days" type="number" inputMode="numeric" value={workDaysStr} placeholder="5"
          onChange={(e) => {setWorkDaysStr(e.target.value); setResult(null);}}
          onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
      </div>
      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}
      <button type="button" onClick={handleCalculate} disabled={!workDaysStr}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40">
        {tC('calculate')}
      </button>
      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('resultDate'), value: dateStr ?? '', primary: true},
            {label: t('calendarDays'), value: `${result.calendarDays} ${t('days')}`},
          ]} />
          <div className="flex justify-end"><FavoriteToggle calculatorId="work-days" /></div>
        </div>
      )}
    </div>
  );
}
