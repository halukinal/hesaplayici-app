'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {
  convertKitchenUnit,
  UNIT_ML,
  type KitchenUnit,
  type KitchenIngredient,
  type ConversionResult,
} from '@/lib/calculators/kitchen-converter';
import {kitchenConverterSchema} from '@/lib/validation/kitchen-converter';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

const UNITS: KitchenUnit[] = [
  'su-bardagi', 'cay-bardagi', 'yemek-kasigi', 'tatli-kasigi', 'cay-kasigi', 'litre', 'ml',
];

const INGREDIENTS: KitchenIngredient[] = [
  'su', 'sut', 'un', 'seker', 'pudra-sekeri', 'tuz', 'tereyagi', 'zeytinyagi', 'pirinc', 'kakao', 'nisasta',
];

const UNIT_ICON: Record<KitchenUnit, string> = {
  'su-bardagi': '🥤',
  'cay-bardagi': '☕',
  'yemek-kasigi': '🥄',
  'tatli-kasigi': '🥄',
  'cay-kasigi': '🫖',
  'litre': '🍶',
  'ml': '💧',
};

// Visual proportional bar: largest = su-bardagi(200ml) baseline
const MAX_ML = 1000;

export default function KitchenConverterCalculator() {
  const t = useTranslations('kitchenConverter');
  const tC = useTranslations('common');
  const [fromUnit, setFromUnit] = useState<KitchenUnit>('su-bardagi');
  const [amountStr, setAmountStr] = useState('1');
  const [showIngredients, setShowIngredients] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    const parse = kitchenConverterSchema.safeParse({
      amount: parseFloat(amountStr.replace(',', '.')),
      fromUnit,
    });
    if (!parse.success) {
      setError(tC('invalidAmount'));
      return;
    }
    const ingredients: KitchenIngredient[] = showIngredients ? INGREDIENTS : [];
    setResult(convertKitchenUnit(parse.data.amount, parse.data.fromUnit, ingredients));
  }

  const unitKey = (u: KitchenUnit) => t(`unit_${u}` as Parameters<typeof t>[0]);

  return (
    <div className="space-y-5">
      {/* Source unit selector */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('fromUnitLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {UNITS.map((u) => (
            <button key={u} type="button" onClick={() => {setFromUnit(u); setResult(null);}} aria-pressed={fromUnit === u}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-colors flex items-center gap-2 ${fromUnit === u ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              <span>{UNIT_ICON[u]}</span>
              <span>{unitKey(u)}</span>
              <span className="ml-auto text-xs opacity-70">{UNIT_ML[u]}ml</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount input */}
      <div>
        <label htmlFor="kc-amount" className="block font-medium text-[#0F172A] mb-2">
          {t('amountLabel')} ({unitKey(fromUnit)})
        </label>
        <input id="kc-amount" type="number" inputMode="decimal" value={amountStr}
          onChange={(e) => {setAmountStr(e.target.value); setResult(null);}}
          onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          placeholder="1"
          className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
      </div>

      {/* Ingredient gram toggle */}
      <label className="flex items-center gap-3 cursor-pointer py-2">
        <span className="relative">
          <input type="checkbox" className="sr-only peer" checked={showIngredients}
            onChange={(e) => {setShowIngredients(e.target.checked); setResult(null);}} />
          <span className="block w-11 h-6 bg-[#E2E8F0] rounded-full peer-checked:bg-[#2563EB] transition-colors" />
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </span>
        <span className="text-[#0F172A] font-medium">{t('showIngredients')}</span>
      </label>

      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}

      <button type="button" onClick={handleCalculate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors">
        {tC('calculate')}
      </button>

      {result && (
        <div className="space-y-4">
          {/* Conversion results */}
          <ResultCard
            title={`${result.fromAmount} ${unitKey(result.fromUnit)} = ${result.totalMl} ml`}
            rows={result.conversions.map((c) => ({
              label: `${UNIT_ICON[c.unit]} ${unitKey(c.unit)}`,
              value: `${c.amount}`,
              primary: c.unit === 'su-bardagi',
            }))}
          />

          {/* Visual proportion bars */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">{t('visualLabel')}</p>
            <div className="space-y-2">
              {[...result.conversions, {unit: result.fromUnit, amount: result.fromAmount}]
                .sort((a, b) => UNIT_ML[b.unit] - UNIT_ML[a.unit])
                .map((c) => {
                  const ml = c.amount * UNIT_ML[c.unit];
                  const pct = Math.min(100, (ml / MAX_ML) * 100);
                  const isSource = c.unit === result.fromUnit;
                  return (
                    <div key={c.unit} className="flex items-center gap-2">
                      <span className="w-6 text-base">{UNIT_ICON[c.unit]}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-[#64748B] mb-1">
                          <span className={isSource ? 'font-bold text-[#2563EB]' : ''}>{unitKey(c.unit)}</span>
                          <span className="font-medium">{c.amount}</span>
                        </div>
                        <div className="h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isSource ? 'bg-[#2563EB]' : 'bg-[#94A3B8]'}`}
                            style={{width: `${pct}%`}}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Ingredient gram table */}
          {result.gramsBy && result.gramsBy.length > 0 && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">{t('gramTableTitle')}</p>
              <div className="grid grid-cols-2 gap-2">
                {result.gramsBy.map(({ingredient, grams}) => (
                  <div key={ingredient} className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-xl px-3 py-2">
                    <span className="text-sm text-[#0F172A]">{t(`ingredient_${ingredient}` as Parameters<typeof t>[0])}</span>
                    <span className="text-sm font-bold text-[#2563EB]">{grams}g</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end"><FavoriteToggle calculatorId="kitchen-converter" /></div>
        </div>
      )}
    </div>
  );
}
