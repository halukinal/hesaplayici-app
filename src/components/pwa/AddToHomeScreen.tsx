'use client';

import {useTranslations} from 'next-intl';
import {Share} from 'lucide-react';

export default function AddToHomeScreen() {
  const t = useTranslations('pwa');
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex gap-3 items-start">
      <Share size={20} className="text-[#2563EB] shrink-0 mt-0.5" aria-hidden />
      <div>
        <p className="font-semibold text-[#0F172A] text-sm">{t('iosGuideTitle')}</p>
        <p className="text-[#64748B] text-sm mt-1">{t('iosGuide')}</p>
      </div>
    </div>
  );
}
