'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {calculateSalary, type SalaryResult, type SalaryMode} from '@/lib/calculators/salary';
import {salarySchema} from '@/lib/validation/salary';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle, ChevronDown, ChevronUp} from 'lucide-react';

export default function SalaryCalculator() {
  const t = useTranslations('salary');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const [mode, setMode] = useState<SalaryMode>('gross-to-net');
  const [amountStr, setAmountStr] = useState('');
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [error, setError] = useState('');
  const [showDetail, setShowDetail] = useState(false);

  function formatTRY(n: number): string {
    return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }

  function handleCalculate() {
    setError('');
    const amount = parseFloat(amountStr.replace(',', '.'));
    const parse = salarySchema.safeParse({amount, mode});
    if (!parse.success) {
      const issue = parse.error.issues[0];
      const message = issue
        ? tCommon(issue.message as Parameters<typeof tCommon>[0])
        : tCommon('error');
      setError(message);
      setResult(null);
      return;
    }
    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculateSalary(parse.data));
    setShowDetail(false);
  }

  const primaryLabel = mode === 'gross-to-net' ? t('resultNet') : t('resultGross');
  const primaryValue = result
    ? formatTRY(mode === 'gross-to-net' ? result.net : result.gross)
    : '';

  return (
    <div className="space-y-5">
      {/* Mod seçimi */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('modeLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['gross-to-net', 'net-to-gross'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {setMode(m); setResult(null); setError('');}}
              aria-pressed={mode === m}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-base transition-colors ${
                mode === m
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              {t(m === 'gross-to-net' ? 'modeGrossToNet' : 'modeNetToGross')}
            </button>
          ))}
        </div>
      </div>

      {/* Tutar girişi */}
      <div>
        <label htmlFor="salary-amount" className="block font-medium text-[#0F172A] mb-2">
          {mode === 'gross-to-net' ? t('grossLabel') : t('netLabel')}
        </label>
        <div className="relative">
          <input
            id="salary-amount"
            type="number"
            inputMode="decimal"
            value={amountStr}
            onChange={(e) => {setAmountStr(e.target.value); setResult(null); setError('');}}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            placeholder="0,00"
            className={`w-full h-14 pl-10 pr-4 rounded-xl border-2 text-lg font-medium text-[#0F172A] focus:outline-none focus:border-[#2563EB] ${
              error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
            }`}
            aria-describedby={error ? 'salary-error' : undefined}
            aria-invalid={!!error}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-semibold pointer-events-none">
            ₺
          </span>
        </div>
        {error && (
          <p id="salary-error" className="mt-1 text-[#EF4444] text-sm flex items-center gap-1" role="alert">
            <AlertCircle size={14} aria-hidden /> {error}
          </p>
        )}
      </div>

      {/* Not */}
      <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
        ℹ️ {t('note2025')}
      </p>

      {/* Hesapla butonu */}
      <button
        type="button"
        onClick={handleCalculate}
        disabled={!amountStr}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {tCommon('calculate')}
      </button>

      {/* Sonuç */}
      {result && (
        <div className="space-y-3">
          <ResultCard
            title={t('resultTitle')}
            rows={[
              {
                label: primaryLabel,
                value: primaryValue,
                primary: true,
              },
              {
                label: mode === 'gross-to-net' ? t('resultGross') : t('resultNet'),
                value: formatTRY(mode === 'gross-to-net' ? result.gross : result.net),
              },
              {
                label: t('totalDeductions'),
                value: formatTRY(result.totalDeductions),
              },
            ]}
          />

          {/* Detay aç/kapat */}
          <button
            type="button"
            onClick={() => setShowDetail((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#475569] text-sm font-medium hover:border-[#2563EB] transition-colors"
          >
            {t('deductionDetail')}
            {showDetail ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showDetail && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl divide-y divide-[#E2E8F0]">
              {[
                {label: t('sgkLabel'), value: formatTRY(result.sgk)},
                {label: t('unemploymentLabel'), value: formatTRY(result.unemployment)},
                {label: t('incomeTaxLabel'), value: formatTRY(result.incomeTax)},
                {label: t('stampTaxLabel'), value: formatTRY(result.stampTax)},
                {label: t('employerCostLabel'), value: formatTRY(result.employerCost)},
              ].map(({label, value}) => (
                <div key={label} className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-[#64748B]">{label}</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <FavoriteToggle calculatorId="salary" />
          </div>

          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
            ⚠️ {t('disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
