'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateFabricAmount, type FabricProject, type FabricInput, type FabricResult} from '@/lib/calculators/fabric-amount';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';

const PROJECTS: FabricProject[] = ['perde', 'etek', 'elbise', 'pantolon', 'koltuk-kilifi'];

export default function FabricCalculator() {
  const t = useTranslations('fabric');
  const tC = useTranslations('common');
  const [project, setProject] = useState<FabricProject>('perde');
  const [fields, setFields] = useState<Record<string, string>>({
    curtainWidth: '200', curtainHeight: '250', panels: '2',
    hip: '90', waist: '72', skirtLength: '70', dressHeight: '110', inseam: '75',
    seatWidth: '60', seatDepth: '55', seatHeight: '80',
  });
  const [result, setResult] = useState<FabricResult | null>(null);

  function upd(key: string, val: string) { setFields((f) => ({...f, [key]: val})); setResult(null); }

  function handleCalculate() {
    const n = (k: string) => parseFloat(fields[k] || '0') || undefined;
    const input: FabricInput = {
      project,
      curtainWidth: n('curtainWidth'), curtainHeight: n('curtainHeight'), panels: n('panels'),
      hip: n('hip'), waist: n('waist'), skirtLength: n('skirtLength'),
      dressHeight: n('dressHeight'), inseam: n('inseam'),
      seatWidth: n('seatWidth'), seatDepth: n('seatDepth'), seatHeight: n('seatHeight'),
    };
    setResult(calculateFabricAmount(input));
  }

  const inputCls = 'w-full h-12 px-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none text-base font-medium text-[#0F172A]';

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('projectLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {PROJECTS.map((p) => (
            <button key={p} type="button" onClick={() => {setProject(p); setResult(null);}} aria-pressed={project === p}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-colors ${project === p ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(`project_${p}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>

      {project === 'perde' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('curtainWidth')} (cm)</label>
              <input type="number" inputMode="numeric" value={fields.curtainWidth} onChange={(e) => upd('curtainWidth', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('curtainHeight')} (cm)</label>
              <input type="number" inputMode="numeric" value={fields.curtainHeight} onChange={(e) => upd('curtainHeight', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('panels')}</label>
            <input type="number" inputMode="numeric" value={fields.panels} onChange={(e) => upd('panels', e.target.value)} className={inputCls} />
          </div>
        </div>
      )}

      {(project === 'etek' || project === 'elbise' || project === 'pantolon') && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('hip')} (cm)</label>
            <input type="number" inputMode="numeric" value={fields.hip} onChange={(e) => upd('hip', e.target.value)} className={inputCls} />
          </div>
          {project === 'etek' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('skirtLength')} (cm)</label>
              <input type="number" inputMode="numeric" value={fields.skirtLength} onChange={(e) => upd('skirtLength', e.target.value)} className={inputCls} />
            </div>
          )}
          {project === 'elbise' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('dressHeight')} (cm)</label>
              <input type="number" inputMode="numeric" value={fields.dressHeight} onChange={(e) => upd('dressHeight', e.target.value)} className={inputCls} />
            </div>
          )}
          {project === 'pantolon' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('inseam')} (cm)</label>
              <input type="number" inputMode="numeric" value={fields.inseam} onChange={(e) => upd('inseam', e.target.value)} className={inputCls} />
            </div>
          )}
        </div>
      )}

      {project === 'koltuk-kilifi' && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('seatWidth')} (cm)</label>
            <input type="number" inputMode="numeric" value={fields.seatWidth} onChange={(e) => upd('seatWidth', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('seatDepth')} (cm)</label>
            <input type="number" inputMode="numeric" value={fields.seatDepth} onChange={(e) => upd('seatDepth', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">{t('seatHeight')} (cm)</label>
            <input type="number" inputMode="numeric" value={fields.seatHeight} onChange={(e) => upd('seatHeight', e.target.value)} className={inputCls} />
          </div>
        </div>
      )}

      <button type="button" onClick={handleCalculate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors">
        {tC('calculate')}
      </button>

      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            {label: t('meters'), value: `${result.meters} m`, primary: true},
            {label: t('metersExtra'), value: `${result.metersExtra} m`},
          ]} />
          {result.notes && (
            <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">{result.notes}</p>
          )}
          <div className="flex justify-end"><FavoriteToggle calculatorId="fabric-amount" /></div>
        </div>
      )}
    </div>
  );
}
