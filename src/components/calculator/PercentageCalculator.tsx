'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculatePercentage, type PercentageResult, type PercentageMode} from '@/lib/calculators/percentage';
import {percentageSchema} from '@/lib/validation/percentage';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

export default function PercentageCalculator() {
  const t = useTranslations('percentage');
  const tCommon = useTranslations('common');

  const [mode, setMode] = useState<PercentageMode>('findValue');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<PercentageResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    const parse = percentageSchema.safeParse({
      mode,
      value1: parseFloat(value1.replace(',', '.')) || 0,
      value2: parseFloat(value2.replace(',', '.')) || 0,
    });

    if (!parse.success) {
      const issue = parse.error.issues[0];
      const message = issue ? tCommon(issue.message as Parameters<typeof tCommon>[0]) : tCommon('error');
      setError(message);
      setResult(null);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculatePercentage(parse.data));
  }

  function getLabels() {
    switch (mode) {
      case 'findValue':
        return {l1: t('valueA'), l2: t('percentageB')};
      case 'findPercentage':
        return {l1: t('valueA'), l2: t('valueB')};
      case 'findChange':
        return {l1: t('valueA'), l2: t('valueB')};
    }
  }

  const labels = getLabels();

  return (
    <div className="space-y-6">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('modeLabel')}</p>
        <div className="flex flex-col gap-2">
          {(['findValue', 'findPercentage', 'findChange'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {setMode(m); setResult(null); setError('');}}
              aria-pressed={mode === m}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-left text-sm transition-colors ${
                mode === m
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              {t(`mode${m.charAt(0).toUpperCase() + m.slice(1)}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#64748B] mb-1">{labels.l1}</label>
          <input
            type="number"
            inputMode="decimal"
            value={value1}
            onChange={(e) => {setValue1(e.target.value); setResult(null);}}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            placeholder="0"
            className={`w-full h-12 px-4 rounded-xl border-2 outline-none font-medium ${
              error && !value1 ? 'border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#2563EB]'
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#64748B] mb-1">{labels.l2}</label>
          <input
            type="number"
            inputMode="decimal"
            value={value2}
            onChange={(e) => {setValue2(e.target.value); setResult(null);}}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            placeholder="0"
            className={`w-full h-12 px-4 rounded-xl border-2 outline-none font-medium ${
              error && (!value2 || error === tCommon('cannotDivideByZero')) ? 'border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#2563EB]'
            }`}
          />
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
        disabled={!value1 || !value2}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40"
      >
        {tCommon('calculate')}
      </button>

      {result && (
        <div className="space-y-4">
          <ResultCard
            title={t('resultTitle')}
            rows={[
              {
                label: mode === 'findChange' 
                  ? (result.result >= 0 ? t('resultIncrease') : t('resultDecrease'))
                  : t('resultValue'),
                value: mode === 'findValue' ? result.result : `%${Math.abs(result.result)}`,
                primary: true,
              },
            ]}
          />
          <div className="flex justify-end">
            <FavoriteToggle calculatorId="percentage" />
          </div>
        </div>
      )}
    </div>
  );
}
