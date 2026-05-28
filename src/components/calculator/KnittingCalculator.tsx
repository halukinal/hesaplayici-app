'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateKnittingCost, type KnittingResult} from '@/lib/calculators/knitting-cost';
import {knittingSchema} from '@/lib/validation/knitting-cost';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

export default function KnittingCalculator() {
  const t = useTranslations('knitting');
  const tCommon = useTranslations('common');

  const [mode, setMode] = useState<'suggest' | 'profit'>('suggest');
  const [yarnCost, setYarnCost] = useState('');
  const [accessoryCost, setAccessoryCost] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [laborHours, setLaborHours] = useState('');
  const [laborRate, setLaborRate] = useState('');
  const [profitRate, setProfitRate] = useState('50');
  const [salesPrice, setSalesPrice] = useState('');
  const [result, setResult] = useState<KnittingResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    const parse = knittingSchema.safeParse({
      yarnCost: parseFloat(yarnCost.replace(',', '.')) || 0,
      accessoryCost: parseFloat(accessoryCost.replace(',', '.')) || 0,
      shippingCost: parseFloat(shippingCost.replace(',', '.')) || 0,
      laborHours: parseFloat(laborHours.replace(',', '.')) || 0,
      laborRate: parseFloat(laborRate.replace(',', '.')) || 0,
      profitRate: mode === 'suggest' ? parseFloat(profitRate.replace(',', '.')) : undefined,
      salesPrice: mode === 'profit' ? parseFloat(salesPrice.replace(',', '.')) : undefined,
      mode,
    });

    if (!parse.success) {
      const issue = parse.error.issues[0];
      const message = issue ? tCommon(issue.message as Parameters<typeof tCommon>[0]) : tCommon('error');
      setError(message);
      setResult(null);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculateKnittingCost(parse.data));
  }

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-2">
        {(['suggest', 'profit'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {setMode(m); setResult(null);}}
            aria-pressed={mode === m}
            className={`py-3 px-2 rounded-xl border-2 font-medium text-sm transition-colors ${
              mode === m
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
            }`}
          >
            {t(m === 'suggest' ? 'modeSuggest' : 'modeProfit')}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
          {t('materialsTitle')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-1">{t('yarnLabel')}</label>
            <input
              type="number"
              inputMode="decimal"
              value={yarnCost}
              onChange={(e) => setYarnCost(e.target.value)}
              placeholder="0,00"
              className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-1">{t('accessoryLabel')}</label>
            <input
              type="number"
              inputMode="decimal"
              value={accessoryCost}
              onChange={(e) => setAccessoryCost(e.target.value)}
              placeholder="0,00"
              className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#64748B] mb-1">{t('shippingLabel')}</label>
          <input
            type="number"
            inputMode="decimal"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="0,00"
            className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
          />
        </div>

        <h3 className="font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2 pt-2">
          {t('laborTitle')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-1">{t('laborHours')}</label>
            <input
              type="number"
              inputMode="decimal"
              value={laborHours}
              onChange={(e) => setLaborHours(e.target.value)}
              placeholder="0"
              className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-1">{t('laborRate')}</label>
            <input
              type="number"
              inputMode="decimal"
              value={laborRate}
              onChange={(e) => setLaborRate(e.target.value)}
              placeholder="0,00"
              className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
            />
          </div>
        </div>

        <h3 className="font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2 pt-2">
          {t('profitTitle')}
        </h3>
        {mode === 'suggest' ? (
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-1">{t('profitRate')}</label>
            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                value={profitRate}
                onChange={(e) => setProfitRate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] font-bold">%</span>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-1">{t('salesPrice')}</label>
            <input
              type="number"
              inputMode="decimal"
              value={salesPrice}
              onChange={(e) => setSalesPrice(e.target.value)}
              placeholder="0,00"
              className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert">
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors"
      >
        {tCommon('calculate')}
      </button>

      {result && (
        <div className="space-y-4">
          <ResultCard
            title={t('resultTitle')}
            rows={[
              {
                label: mode === 'suggest' ? t('recommendedPrice') : t('calculatedProfit'),
                value: `${mode === 'suggest' ? result.recommendedPrice : result.profit} ₺`,
                primary: true,
              },
              {
                label: t('totalCost'),
                value: `${result.totalCost} ₺`,
              },
              {
                label: mode === 'suggest' ? t('calculatedProfit') : t('calculatedProfitRate'),
                value: mode === 'suggest' ? `${result.profit} ₺` : `%${result.profitRate}`,
              },
            ]}
          />
          <div className="flex justify-end">
            <FavoriteToggle calculatorId="knitting-cost" />
          </div>
          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
            ⚠️ {t('disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
