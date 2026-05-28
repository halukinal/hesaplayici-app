'use client';

import {useState} from 'react';
import {Save, Check} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {saveRecord} from '@/lib/storage/records';

interface Props {
  calculatorId: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  disabled?: boolean;
  onSave?: () => void;
}

export default function SaveButton({calculatorId, inputs, result, disabled, onSave}: Props) {
  const t = useTranslations('common');
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (disabled) return;
    await saveRecord({calculatorId, inputs, result});
    setSaved(true);
    onSave?.();
    setTimeout(() => setSaved(false), 2000);
    if ('vibrate' in navigator) navigator.vibrate(50);
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={disabled || saved}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#2563EB] text-[#2563EB] font-medium text-base transition-colors hover:bg-[#EFF6FF] disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={t('save')}
    >
      {saved ? <Check size={18} aria-hidden /> : <Save size={18} aria-hidden />}
      {t('save')}
    </button>
  );
}
