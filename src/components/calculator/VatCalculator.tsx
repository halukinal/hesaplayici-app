'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {calculateVat, type VatResult} from '@/lib/calculators/vat';
import {vatSchema} from '@/lib/validation/vat';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

const PRESET_RATES = [1, 10, 20];

export default function VatCalculator() {
  const t = useTranslations('vat');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amountStr, setAmountStr] = useState('');
  const [vatRate, setVatRate] = useState(20);
  const [customRate, setCustomRate] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [currency, setCurrency] = useState('TRY');
  const [result, setResult] = useState<VatResult | null>(null);
  const [error, setError] = useState('');

  const currencySymbols: Record<string, string> = {TRY: '₺', USD: '$', EUR: '€'};

  function formatAmount(n: number, currency: string): string {
    return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  }

  function handleRateSelect(rate: number) {
    setVatRate(rate);
    setIsCustom(false);
    setCustomRate('');
  }

  function handleCustomRate(v: string) {
    setCustomRate(v);
    setIsCustom(true);
    const n = parseFloat(v);
    if (!isNaN(n)) setVatRate(n);
  }

  function handleCalculate() {
    setError('');
    const amount = parseFloat(amountStr.replace(',', '.'));
    const effectiveRate = isCustom ? parseFloat(customRate.replace(',', '.')) : vatRate;

    const parse = vatSchema.safeParse({amount, vatRate: effectiveRate, mode});
    if (!parse.success) {
      const issue = parse.error.issues[0];
      const message = issue ? tCommon(issue.message as Parameters<typeof tCommon>[0]) : tCommon('error');
      setError(message);
      setResult(null);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculateVat(parse.data));
  }

  const sym = currencySymbols[currency] ?? '₺';

  return (
    <div className="space-y-5">
      {/* Mod seçimi */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('modeLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['add', 'remove'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {setMode(m); setResult(null);}}
              aria-pressed={mode === m}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-base transition-colors ${
                mode === m
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              {t(m === 'add' ? 'modeAdd' : 'modeRemove')}
            </button>
          ))}
        </div>
      </div>

      {/* KDV oranı */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('rateLabel')}</p>
        <div className="flex gap-2 flex-wrap">
          {PRESET_RATES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRateSelect(r)}
              aria-pressed={!isCustom && vatRate === r}
              className={`px-4 py-2 rounded-xl border-2 font-semibold text-base transition-colors min-h-[48px] ${
                !isCustom && vatRate === r
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              %{r}
            </button>
          ))}
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder={t('customRate')}
              value={customRate}
              onChange={(e) => handleCustomRate(e.target.value)}
              onFocus={() => setIsCustom(true)}
              className={`h-12 w-28 px-3 rounded-xl border-2 text-base font-medium text-[#0F172A] focus:outline-none ${
                isCustom ? 'border-[#2563EB]' : 'border-[#E2E8F0]'
              }`}
              aria-label={t('customRate')}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">%</span>
          </div>
        </div>
      </div>

      {/* Para birimi */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('currencyLabel')}</p>
        <div className="flex gap-2">
          {Object.entries(currencySymbols).map(([code, symbol]) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              aria-pressed={currency === code}
              className={`px-4 py-2 rounded-xl border-2 font-medium text-base transition-colors min-h-[48px] ${
                currency === code
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              {symbol} {code}
            </button>
          ))}
        </div>
      </div>

      {/* Tutar girişi */}
      <div>
        <label htmlFor="vat-amount" className="block font-medium text-[#0F172A] mb-2">
          {mode === 'add' ? t('netAmountLabel') : t('grossAmountLabel')}
        </label>
        <div className="relative">
          <input
            id="vat-amount"
            type="number"
            inputMode="decimal"
            value={amountStr}
            onChange={(e) => {setAmountStr(e.target.value); setResult(null); setError('');}}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            placeholder="0,00"
            className={`w-full h-14 pl-10 pr-4 rounded-xl border-2 text-lg font-medium text-[#0F172A] focus:outline-none focus:border-[#2563EB] ${
              error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
            }`}
            aria-describedby={error ? 'vat-error' : undefined}
            aria-invalid={!!error}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-semibold pointer-events-none">
            {sym}
          </span>
        </div>
        {error && (
          <p id="vat-error" className="mt-1 text-[#EF4444] text-sm flex items-center gap-1" role="alert">
            <AlertCircle size={14} aria-hidden /> {error}
          </p>
        )}
      </div>

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
                label: mode === 'add' ? t('resultGross') : t('resultNet'),
                value: formatAmount(mode === 'add' ? result.gross : result.net, currency),
                primary: true,
              },
              {
                label: t('resultVatAmount'),
                value: formatAmount(result.vatAmount, currency),
              },
              {
                label: mode === 'add' ? t('resultNet') : t('resultGross'),
                value: formatAmount(mode === 'add' ? result.net : result.gross, currency),
              },
            ]}
          />

          <div className="flex justify-end">
            <FavoriteToggle calculatorId="vat" />
          </div>

          {/* Sorumluluk reddi */}
          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
            ⚠️ {t('disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
