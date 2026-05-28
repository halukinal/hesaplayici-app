'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateCalories, type CalorieResult} from '@/lib/calculators/calorie';
import {calorieSchema} from '@/lib/validation/calorie';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import SaveButton from './SaveButton';
import CalorieHistory from './CalorieHistory';
import {AlertCircle} from 'lucide-react';

const ACTIVITY_LEVELS = [
  'sedentary',
  'light',
  'moderate',
  'active',
  'veryActive',
] as const;

export default function CalorieCalculator() {
  const t = useTranslations('calorie');
  const tCommon = useTranslations('common');

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<(typeof ACTIVITY_LEVELS)[number]>('sedentary');
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  function handleCalculate() {
    setError('');
    const numAge = parseInt(age);
    const numWeight = parseFloat(weight.replace(',', '.'));
    const numHeight = parseFloat(height.replace(',', '.'));

    const parse = calorieSchema.safeParse({
      age: numAge,
      weightKg: numWeight,
      heightCm: numHeight,
      sex,
      activityLevel: activity,
    });

    if (!parse.success) {
      const issue = parse.error.issues[0];
      const message = issue ? tCommon(issue.message as Parameters<typeof tCommon>[0]) : tCommon('error');
      setError(message);
      setResult(null);
      return;
    }

    if ('vibrate' in navigator) navigator.vibrate(30);
    setResult(calculateCalories(parse.data));
  }

  return (
    <div className="space-y-6">
      {/* Cinsiyet */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('sexLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['male', 'female'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSex(s)}
              aria-pressed={sex === s}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-base transition-colors ${
                sex === s
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              {t(s === 'male' ? 'sexMale' : 'sexFemale')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Yaş */}
        <div>
          <label htmlFor="age" className="block font-medium text-[#0F172A] mb-2">
            {t('ageLabel')}
          </label>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
          />
        </div>
        {/* Kilo */}
        <div>
          <label htmlFor="weight" className="block font-medium text-[#0F172A] mb-2">
            {t('weightLabel')}
          </label>
          <input
            id="weight"
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
          />
        </div>
      </div>

      {/* Boy */}
      <div>
        <label htmlFor="height" className="block font-medium text-[#0F172A] mb-2">
          {t('heightLabel')}
        </label>
        <input
          id="height"
          type="number"
          inputMode="decimal"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium"
        />
      </div>

      {/* Aktivite */}
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('activityLabel')}</p>
        <div className="space-y-2">
          {ACTIVITY_LEVELS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setActivity(a)}
              aria-pressed={activity === a}
              className={`w-full py-3 px-4 rounded-xl border-2 font-medium text-left text-sm transition-colors ${
                activity === a
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
            >
              {t(`activity${a.charAt(0).toUpperCase() + a.slice(1)}` as Parameters<typeof t>[0])}
            </button>
          ))}
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
        disabled={!age || !weight || !height}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-40"
      >
        {tCommon('calculate')}
      </button>

      {result && (
        <div className="space-y-6">
          <ResultCard
            title={t('resultTitle')}
            rows={[
              {
                label: t('resultTdee'),
                value: `${result.tdee} kcal`,
                primary: true,
              },
              {
                label: t('resultBmr'),
                value: `${result.bmr} kcal`,
              },
              {
                label: t('resultBmi'),
                value: `${result.bmi} (${t(`bmi${result.bmiCategory.charAt(0).toUpperCase() + result.bmiCategory.slice(1)}` as Parameters<typeof t>[0])})`,
              },
            ]}
          />

          <div className="flex justify-between items-center">
            <FavoriteToggle calculatorId="calorie" />
            <SaveButton
              calculatorId="calorie"
              inputs={{age, weight, height, sex, activity}}
              result={result as unknown as Record<string, unknown>}
              onSave={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>

          <CalorieHistory calculatorId="calorie" refreshKey={refreshKey} />

          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
            ⚠️ {t('disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
