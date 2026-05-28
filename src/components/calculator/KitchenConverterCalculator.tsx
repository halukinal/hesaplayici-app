'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {
  convertKitchenUnit,
  UNIT_ML,
  INGREDIENT_DENSITY,
  type KitchenUnit,
  type KitchenIngredient,
  type ConversionResult,
} from '@/lib/calculators/kitchen-converter';
import {kitchenConverterSchema} from '@/lib/validation/kitchen-converter';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

const UNITS: KitchenUnit[] = [
  'su-bardagi', 'cay-bardagi', 'yemek-kasigi', 'tatli-kasigi', 'cay-kasigi', 'litre', 'ml', 'gram',
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
  'gram': '⚖️',
};

const MAX_ML = 1000;

export default function KitchenConverterCalculator() {
  const t = useTranslations('kitchenConverter');
  const tC = useTranslations('common');
  const [fromUnit, setFromUnit] = useState<KitchenUnit>('su-bardagi');
  const [fromIngredient, setFromIngredient] = useState<KitchenIngredient>('un');
  const [amountStr, setAmountStr] = useState('1');
  const [showIngredients, setShowIngredients] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState('');

  const isGram = fromUnit === 'gram';

  function handleCalculate() {
    setError('');
    const parse = kitchenConverterSchema.safeParse({
      amount: parseFloat(amountStr.replace(',', '.')),
      fromUnit,
    });
    if (!parse.success) { setError(tC('invalidAmount')); return; }
    const ingredients: KitchenIngredient[] = showIngredients && !isGram ? INGREDIENTS : [];
    setResult(convertKitchenUnit(
      parse.data.amount,
      parse.data.fromUnit,
      {showIngredients: ingredients, fromIngredient: isGram ? fromIngredient : undefined},
    ));
  }

  const unitKey = (u: KitchenUnit) => t(`unit_${u}` as Parameters<typeof t>[0]);
  const ingKey = (i: KitchenIngredient) => t(`ingredient_${i}` as Parameters<typeof t>[0]);

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
              {u !== 'gram' && <span className="ml-auto text-xs opacity-70">{UNIT_ML[u as Exclude<KitchenUnit, 'gram'>]}ml</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient picker — only when gram is selected */}
      {isGram && (
        <div>
          <label htmlFor="kc-ingredient" className="block font-medium text-[#0F172A] mb-2">
            {t('ingredientLabel')}
          </label>
          <select id="kc-ingredient" value={fromIngredient}
            onChange={(e) => {setFromIngredient(e.target.value as KitchenIngredient); setResult(null);}}
            className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-base font-medium text-[#0F172A] bg-white">
            {INGREDIENTS.map((i) => (
              <option key={i} value={i}>{ingKey(i)}</option>
            ))}
          </select>
        </div>
      )}

      {/* Amount input */}
      <div>
        <label htmlFor="kc-amount" className="block font-medium text-[#0F172A] mb-2">
          {t('amountLabel')} ({isGram ? `${ingKey(fromIngredient)} (g)` : unitKey(fromUnit)})
        </label>
        <input id="kc-amount" type="number" inputMode="decimal" value={amountStr}
          onChange={(e) => {setAmountStr(e.target.value); setResult(null);}}
          onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          placeholder={isGram ? '100' : '1'}
          className="w-full h-14 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-lg font-medium text-[#0F172A]" />
      </div>

      {/* Ingredient gram toggle — only for volume units */}
      {!isGram && (
        <label className="flex items-center gap-3 cursor-pointer py-2">
          <span className="relative">
            <input type="checkbox" className="sr-only peer" checked={showIngredients}
              onChange={(e) => {setShowIngredients(e.target.checked); setResult(null);}} />
            <span className="block w-11 h-6 bg-[#E2E8F0] rounded-full peer-checked:bg-[#2563EB] transition-colors" />
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
          </span>
          <span className="text-[#0F172A] font-medium">{t('showIngredients')}</span>
        </label>
      )}

      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}

      <button type="button" onClick={handleCalculate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors">
        {tC('calculate')}
      </button>

      {result && (
        <div className="space-y-4">
          {/* Conversion results */}
          <ResultCard
            title={
              isGram && result.fromIngredient
                ? `${result.fromAmount}g ${ingKey(result.fromIngredient)} = ${Math.round(result.totalMl)} ml`
                : `${result.fromAmount} ${unitKey(result.fromUnit)} = ${result.totalMl} ml`
            }
            rows={result.conversions.map((c) => ({
              label: `${UNIT_ICON[c.unit]} ${unitKey(c.unit)}`,
              value: `${c.amount}`,
              primary: c.unit === 'su-bardagi',
            }))}
          />

          {/* Visual proportion bars — volume units only */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">{t('visualLabel')}</p>
            <div className="space-y-2">
              {(isGram
                ? result.conversions
                : [...result.conversions, {unit: result.fromUnit as Exclude<KitchenUnit, 'gram'>, amount: result.fromAmount}]
              )
                .sort((a, b) => UNIT_ML[b.unit] - UNIT_ML[a.unit])
                .map((c) => {
                  const ml = c.amount * UNIT_ML[c.unit];
                  const pct = Math.min(100, (ml / MAX_ML) * 100);
                  const isSource = !isGram && c.unit === result.fromUnit;
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

          {/* Gram → all ingredients comparison (when gram input) */}
          {isGram && result.fromIngredient && (
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4">
              <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wide mb-1">{t('gramNoteTitle')}</p>
              <p className="text-sm text-[#1D4ED8]">
                {t('gramNoteBody', {
                  amount: result.fromAmount,
                  ingredient: ingKey(result.fromIngredient),
                  ml: Math.round(result.totalMl),
                })}
              </p>
            </div>
          )}

          {/* Volume → ingredient gram table */}
          {!isGram && result.gramsBy && result.gramsBy.length > 0 && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">{t('gramTableTitle')}</p>
              <div className="grid grid-cols-2 gap-2">
                {result.gramsBy.map(({ingredient, grams}) => (
                  <div key={ingredient} className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-xl px-3 py-2">
                    <span className="text-sm text-[#0F172A]">{ingKey(ingredient)}</span>
                    <span className="text-sm font-bold text-[#2563EB]">{grams}g</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gram → all other ingredients comparison */}
          {isGram && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">{t('gramCompareTitle')}</p>
              <p className="text-xs text-[#64748B] mb-3">{t('gramCompareNote', {amount: result.fromAmount, ml: Math.round(result.totalMl)})}</p>
              <div className="grid grid-cols-2 gap-2">
                {INGREDIENTS.map((ingredient) => {
                  const grams = Math.round(result.totalMl * INGREDIENT_DENSITY[ingredient]);
                  const isCurrent = ingredient === result.fromIngredient;
                  return (
                    <div key={ingredient}
                      className={`flex items-center justify-between border rounded-xl px-3 py-2 ${isCurrent ? 'bg-[#EFF6FF] border-[#BFDBFE]' : 'bg-white border-[#E2E8F0]'}`}>
                      <span className={`text-sm ${isCurrent ? 'font-bold text-[#2563EB]' : 'text-[#0F172A]'}`}>{ingKey(ingredient)}</span>
                      <span className={`text-sm font-bold ${isCurrent ? 'text-[#2563EB]' : 'text-[#64748B]'}`}>{grams}g</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end"><FavoriteToggle calculatorId="kitchen-converter" /></div>
        </div>
      )}
    </div>
  );
}
