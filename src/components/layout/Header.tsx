'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {Calculator} from 'lucide-react';
import NavMenu from './NavMenu';

export default function Header() {
  const t = useTranslations('meta');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, {locale: next});
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <NavMenu />
        <Calculator className="text-[#2563EB]" size={24} aria-hidden />
        <span className="font-bold text-[#0F172A] text-lg">{t('siteName')}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => switchLocale('tr')}
          aria-label="Türkçe"
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'tr'
              ? 'bg-[#2563EB] text-white'
              : 'text-[#64748B] hover:bg-[#F8FAFC]'
          }`}
        >
          TR
        </button>
        <button
          onClick={() => switchLocale('en')}
          aria-label="English"
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === 'en'
              ? 'bg-[#2563EB] text-white'
              : 'text-[#64748B] hover:bg-[#F8FAFC]'
          }`}
        >
          EN
        </button>
      </div>
    </header>
  );
}
