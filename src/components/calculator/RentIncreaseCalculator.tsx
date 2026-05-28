'use client';
import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {calculateRentIncrease, type RentIncreaseResult} from '@/lib/calculators/rent-increase';
import {rentIncreaseSchema} from '@/lib/validation/rent-increase';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

const PRESET_RATES = [25, 30, 40, 50];

export default function RentIncreaseCalculator() {
  const t = useTranslations('rentIncrease');
  const tC = useTranslations('common');
  const locale = useLocale();
  const [rentStr, setRentStr] = useState('');
  const [rateStr, setRateStr] = useState('');
  const [result, setResult] = useState<RentIncreaseResult | null>(null);
  const [error, setError] = useState('');

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency', currency: 'TRY', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

  function handleCalculate() {
    setError('');
    const parse = rentIncreaseSchema.safeParse({
      currentRent: parseFloat(rentStr.replace(',', '.')),
      increaseRate: parseFloat(rateStr.replace(',', '.')),
    });
    if (!parse.success) {
      const msg = parse.error.issues[0]?.message;
      setError(tC((msg ?? 'error') as Parameters<typeof tC>[0]));
      return;
    }
    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculateRentIncrease(parse.data));
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="ri-rent" className="block font-medium text-[#0F172A] mb-2">{t('currentRentLabel')}</label>
        <div className="relative">
          <input id="ri-rent" type="number" inputMode="decimal" value={rentStr} placeholder="10000"
            onChange={(e) => {setRentStr(e.target.value); setResult(null); setError('');}}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            className={`w-full h-14 pl-10 pr-4 rounded-xl border-2 text-lg font-medium text-[#0F172A] focus:outline-none focus:border-[#2563EB] ${error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'}`} />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-semibold pointer-events-none">₺</span>
        </div>
      </div>
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('rateLabel')}</p>
        <div className="flex gap-2 flex-wrap mb-2">
          {PRESET_RATES.map((r) => (
            <button key={r} type="button" onClick={() => {setRateStr(String(r)); setResult(null);}}
              aria-pressed={rateStr === String(r)}
              className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm min-h-[44px] transition-colors ${rateStr === String(r) ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              %{r}
            </button>
          ))}
        </div>
        <div className="relative">
          <input type="number" inputMode="decimal" value={rateStr} placeholder={t('customRate')}
            onChange={(e) => {setRateStr(e.target.value); setResult(null);}}
            className="w-full h-12 px-3 pr-10 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium text-[#0F172A]" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">%</span>
        </div>
      </div>
      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}
      <button type="button" onClick={handleCalculate} disabled={!rentStr || !rateStr}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40">
        {tC('calculate')}
      </button>
      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('newRent'), value: fmt(result.newRent), primary: true},
            {label: t('increaseAmount'), value: fmt(result.increaseAmount)},
            {label: t('increasePercent'), value: `%${result.increasePercent}`},
          ]} />
          <div className="flex justify-end"><FavoriteToggle calculatorId="rent-increase" /></div>
          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">⚠️ {t('disclaimer')}</p>
        </div>
      )}
    </div>
  );
}
