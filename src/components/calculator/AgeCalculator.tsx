'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateAge, type AgeResult} from '@/lib/calculators/age';
import {ageSchema} from '@/lib/validation/age';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle, CalendarDays} from 'lucide-react';

export default function AgeCalculator() {
  const t = useTranslations('age');
  const tCommon = useTranslations('common');

  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    
    // Parse to validate format, targetDate is optional
    const parse = ageSchema.safeParse({
      birthDate,
      targetDate: targetDate || undefined,
    });

    if (!parse.success) {
      const issue = parse.error.issues[0];
      const message = issue ? tCommon(issue.message as Parameters<typeof tCommon>[0]) : tCommon('error');
      setError(message);
      setResult(null);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(30);
    try {
        setResult(calculateAge(parse.data));
    } catch (err) {
        setError(err instanceof Error ? err.message : tCommon('error'));
        setResult(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#0F172A] mb-2">{t('birthDateLabel')}</label>
        <div className="relative">
          <input
            type="date"
            value={birthDate}
            max={targetDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => {setBirthDate(e.target.value); setResult(null);}}
            className={`w-full h-14 pl-10 pr-4 rounded-xl border-2 outline-none font-medium text-[#0F172A] bg-white ${
              error && !birthDate ? 'border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#2563EB]'
            }`}
          />
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" size={20} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0F172A] mb-2">
            {t('targetDateLabel')}
            <span className="block text-xs font-normal text-[#64748B] mt-0.5">{t('targetDateHint')}</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={targetDate}
            min={birthDate}
            onChange={(e) => {setTargetDate(e.target.value); setResult(null);}}
            className={`w-full h-14 pl-10 pr-4 rounded-xl border-2 outline-none font-medium text-[#0F172A] bg-white ${
              error && error === tCommon('dateBeforeBirth') ? 'border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#2563EB]'
            }`}
          />
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" size={20} />
        </div>
      </div>

      {error && (
        <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert">
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCalculate}
        disabled={!birthDate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40"
      >
        {tCommon('calculate')}
      </button>

      {result && (
        <div className="space-y-6">
          <ResultCard
            title={t('resultMain')}
            rows={[
              {
                label: '',
                value: (
                    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-end text-center w-full">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl sm:text-5xl font-black text-[#2563EB]">{result.years}</span>
                            <span className="text-sm sm:text-base font-semibold text-[#64748B] uppercase tracking-wider">{t('years')}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl sm:text-5xl font-black text-[#2563EB]">{result.months}</span>
                            <span className="text-sm sm:text-base font-semibold text-[#64748B] uppercase tracking-wider">{t('months')}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl sm:text-5xl font-black text-[#2563EB]">{result.days}</span>
                            <span className="text-sm sm:text-base font-semibold text-[#64748B] uppercase tracking-wider">{t('days')}</span>
                        </div>
                    </div>
                ),
                primary: false, // We style it custom above
              },
            ]}
          />

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2 text-center">{t('resultDetails')}</h3>
              
              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[#E2E8F0]">
                  <div>
                      <p className="text-xl font-bold text-[#0F172A]">{result.totalMonths.toLocaleString()}</p>
                      <p className="text-xs font-medium text-[#64748B]">{t('totalMonths')}</p>
                  </div>
                  <div>
                      <p className="text-xl font-bold text-[#0F172A]">{result.totalWeeks.toLocaleString()}</p>
                      <p className="text-xs font-medium text-[#64748B]">{t('totalWeeks')}</p>
                  </div>
                  <div>
                      <p className="text-xl font-bold text-[#0F172A]">{result.totalDays.toLocaleString()}</p>
                      <p className="text-xs font-medium text-[#64748B]">{t('totalDays')}</p>
                  </div>
              </div>

              {result.nextBirthdayDays !== null && (
                  <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-center">
                      <p className="text-sm font-medium text-[#64748B] mb-1">{t('nextBirthday')}</p>
                      <p className="text-2xl font-bold text-[#10B981]">
                          {result.nextBirthdayDays === 0 ? '🎉 Bugün!' : `${result.nextBirthdayDays} ${t('daysLeft')}`}
                      </p>
                  </div>
              )}
          </div>

          <div className="flex justify-end">
            <FavoriteToggle calculatorId="age" />
          </div>
        </div>
      )}
    </div>
  );
}
