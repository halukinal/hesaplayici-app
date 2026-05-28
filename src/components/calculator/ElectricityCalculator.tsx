'use client';
import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {calculateElectricityBill, TARIFF_PRESETS, type ElectricityResult} from '@/lib/calculators/electricity-bill';
import {electricitySchema} from '@/lib/validation/electricity-bill';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

export default function ElectricityCalculator() {
  const t = useTranslations('electricity');
  const tC = useTranslations('common');
  const locale = useLocale();
  const [watts, setWatts] = useState('');
  const [hours, setHours] = useState('8');
  const [tariff, setTariff] = useState(String(TARIFF_PRESETS.konut));
  const [result, setResult] = useState<ElectricityResult | null>(null);
  const [error, setError] = useState('');

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency', currency: 'TRY', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

  function handleCalculate() {
    setError('');
    const parse = electricitySchema.safeParse({
      watts: parseFloat(watts), hoursPerDay: parseFloat(hours), tariff: parseFloat(tariff.replace(',', '.')),
    });
    if (!parse.success) { setError(tC('invalidAmount')); return; }
    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculateElectricityBill(parse.data));
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('tariffPresetLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(TARIFF_PRESETS).map(([key, val]) => (
            <button key={key} type="button" onClick={() => setTariff(String(val))} aria-pressed={tariff === String(val)}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-colors ${tariff === String(val) ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(`tariff${key.charAt(0).toUpperCase() + key.slice(1)}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="el-tariff" className="block font-medium text-[#0F172A] mb-2">{t('tariffLabel')} (₺/kWh)</label>
        <input id="el-tariff" type="number" inputMode="decimal" value={tariff}
          onChange={(e) => {setTariff(e.target.value); setResult(null);}}
          className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="el-watts" className="block font-medium text-[#0F172A] mb-2">{t('wattsLabel')} (W)</label>
          <input id="el-watts" type="number" inputMode="numeric" value={watts} placeholder="1000"
            onChange={(e) => {setWatts(e.target.value); setResult(null);}}
            className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
        </div>
        <div>
          <label htmlFor="el-hours" className="block font-medium text-[#0F172A] mb-2">{t('hoursLabel')}</label>
          <input id="el-hours" type="number" inputMode="decimal" value={hours}
            onChange={(e) => {setHours(e.target.value); setResult(null);}}
            className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
        </div>
      </div>
      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}
      <button type="button" onClick={handleCalculate} disabled={!watts}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40">
        {tC('calculate')}
      </button>
      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('monthlyCost'), value: fmt(result.monthlyCost), primary: true},
            {label: t('monthlyKwh'), value: `${result.monthlyKwh} kWh`},
            {label: t('dailyCost'), value: fmt(result.dailyCost)},
            {label: t('annualCost'), value: fmt(result.annualCost)},
          ]} />
          <div className="flex justify-end"><FavoriteToggle calculatorId="electricity-bill" /></div>
          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">⚠️ {t('disclaimer')}</p>
        </div>
      )}
    </div>
  );
}
