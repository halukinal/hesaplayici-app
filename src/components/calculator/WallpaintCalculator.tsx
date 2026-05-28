'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {calculateWallpaint, type RoomMode, type WallpaintResult} from '@/lib/calculators/wallpaper-paint';
import {wallpaintSchema} from '@/lib/validation/wallpaper-paint';
import ResultCard from './ResultCard';
import FavoriteToggle from './FavoriteToggle';
import {AlertCircle} from 'lucide-react';

function NumInput({id, label, value, onChange, min=0.1, step=0.1}: {
  id: string; label: string; value: string; onChange: (v: string) => void; min?: number; step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-[#0F172A] mb-1 text-sm">{label}</label>
      <input id={id} type="number" inputMode="decimal" value={value} step={step} min={min}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] outline-none font-medium text-[#0F172A]" />
    </div>
  );
}

export default function WallpaintCalculator() {
  const t = useTranslations('wallpaint');
  const tC = useTranslations('common');
  const [mode, setMode] = useState<RoomMode>('boya');
  const [width, setWidth] = useState('4');
  const [length, setLength] = useState('5');
  const [height, setHeight] = useState('2.7');
  const [doors, setDoors] = useState('1');
  const [windows, setWindows] = useState('2');
  const [coats, setCoats] = useState('2');
  const [result, setResult] = useState<WallpaintResult | null>(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    const parse = wallpaintSchema.safeParse({
      mode,
      roomWidth: parseFloat(width), roomLength: parseFloat(length), roomHeight: parseFloat(height),
      doors: parseInt(doors), windows: parseInt(windows),
      coats: mode === 'boya' ? parseInt(coats) : undefined,
    });
    if (!parse.success) { setError(tC('error')); return; }
    setResult(calculateWallpaint(parse.data));
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="font-medium text-[#0F172A] mb-2">{t('modeLabel')}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['boya', 'duvar-kagidi'] as const).map((m) => (
            <button key={m} type="button" onClick={() => {setMode(m); setResult(null);}} aria-pressed={mode === m}
              className={`py-3 px-4 rounded-xl border-2 font-medium text-base transition-colors ${mode === m ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'}`}>
              {t(m === 'boya' ? 'modePaint' : 'modeWallpaper')}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <NumInput id="wp-width" label={`${t('widthLabel')} (m)`} value={width} onChange={setWidth} />
        <NumInput id="wp-length" label={`${t('lengthLabel')} (m)`} value={length} onChange={setLength} />
        <NumInput id="wp-height" label={`${t('heightLabel')} (m)`} value={height} onChange={setHeight} />
        {mode === 'boya' && <NumInput id="wp-coats" label={t('coatsLabel')} value={coats} onChange={setCoats} min={1} step={1} />}
        <NumInput id="wp-doors" label={t('doorsLabel')} value={doors} onChange={setDoors} min={0} step={1} />
        <NumInput id="wp-windows" label={t('windowsLabel')} value={windows} onChange={setWindows} min={0} step={1} />
      </div>
      {error && <p className="text-[#EF4444] text-sm flex items-center gap-1" role="alert"><AlertCircle size={14} />{error}</p>}
      <button type="button" onClick={handleCalculate}
        className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-bold rounded-xl transition-colors">
        {tC('calculate')}
      </button>
      {result && (
        <div className="space-y-3">
          <ResultCard title={t('resultTitle')} rows={[
            ...(result.liters !== undefined ? [
              {label: t('resultLiters'), value: `${result.liters} L`, primary: true},
              {label: t('resultCans'), value: `${result.literCans} ${t('canUnit')}`},
            ] : []),
            ...(result.rolls !== undefined ? [
              {label: t('resultRolls'), value: `${result.rolls} ${t('rollUnit')}`, primary: true},
            ] : []),
            {label: t('resultWallArea'), value: `${result.wallArea} m²`},
          ]} />
          <div className="flex justify-end"><FavoriteToggle calculatorId="wallpaper-paint" /></div>
          <p className="text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">⚠️ {t('disclaimer')}</p>
        </div>
      )}
    </div>
  );
}
