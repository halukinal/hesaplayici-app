'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateYarnAmount, type YarnProject, type YarnSize, type YarnWeight, type YarnResult} from '@/lib/calculators/yarn-amount';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';

const PROJECTS: YarnProject[] = ['kazak', 'hirka', 'atki', 'bere', 'eldiven'];
const SIZES: YarnSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const WEIGHTS: YarnWeight[] = ['ince', 'orta', 'kalin'];
const SKEIN_GRAMS = [50, 100, 200];

export default function YarnCalculator() {
  const t = useTranslations('yarn');
  const tC = useTranslations('common');
  const [project, setProject] = useState<YarnProject>('kazak');
  const [size, setSize] = useState<YarnSize>('M');
  const [weight, setWeight] = useState<YarnWeight>('orta');
  const [skeinGrams, setSkeinGrams] = useState(100);
  const [result, setResult] = useState<YarnResult | null>(null);

  function handleCalculate() {
    setResult(calculateYarnAmount({project, size, yarnWeight: weight, skeinGrams}));
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('projectLabel')}</p>
        <div className="grid grid-cols-3 gap-2">
          {PROJECTS.map((p) => (
            <button key={p} type="button" onClick={() => {setProject(p); setResult(null);}} aria-pressed={project === p}
              className={`py-2 px-3 rounded-xl border-2 font-medium text-sm transition-colors ${project === p ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(`project${p.charAt(0).toUpperCase() + p.slice(1)}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('sizeLabel')}</p>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((s) => (
            <button key={s} type="button" onClick={() => {setSize(s); setResult(null);}} aria-pressed={size === s}
              className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm min-h-[44px] transition-colors ${size === s ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('weightLabel')}</p>
        <div className="grid grid-cols-3 gap-2">
          {WEIGHTS.map((w) => (
            <button key={w} type="button" onClick={() => {setWeight(w); setResult(null);}} aria-pressed={weight === w}
              className={`py-2 px-3 rounded-xl border-2 font-medium text-sm transition-colors ${weight === w ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(`weight${w.charAt(0).toUpperCase() + w.slice(1)}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('skeinGramsLabel')}</p>
        <div className="flex gap-2 flex-wrap">
          {SKEIN_GRAMS.map((g) => (
            <button key={g} type="button" onClick={() => {setSkeinGrams(g); setResult(null);}} aria-pressed={skeinGrams === g}
              className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm min-h-[44px] transition-colors ${skeinGrams === g ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {g}g
            </button>
          ))}
        </div>
      </div>
      <button type="button" onClick={handleCalculate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors">
        {tC('calculate')}
      </button>
      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('resultSkein'), value: `${result.skeinCountExtra} ${t('skeinUnit')}`, primary: true},
            {label: t('resultSkeinMin'), value: `${result.skeinCount} ${t('skeinUnit')}`},
            {label: t('resultGrams'), value: `${result.totalGrams} g`},
          ]} />
          <div className="flex justify-end"><FavoriteToggle calculatorId="yarn-amount" /></div>
          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">⚠️ {t('disclaimer')}</p>
        </div>
      )}
    </div>
  );
}
