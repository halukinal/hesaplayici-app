'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Menu, X, Home, ChevronRight, Calculator} from 'lucide-react';
import {calculatorRegistry} from '@/lib/registry';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const liveCalculators = calculatorRegistry.filter((c) => c.status === 'live');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-[#64748B] hover:text-[#2563EB] transition-colors"
        aria-label={t('common.loading')} // Placeholder if menu key not exists
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2"
            >
              <Calculator className="text-[#2563EB]" size={24} />
              <span className="font-bold text-[#0F172A] text-lg">
                {t('meta.siteName')}
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#64748B] hover:text-[#EF4444]"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-semibold hover:border-[#2563EB] transition-colors"
            >
              <Home size={20} className="text-[#2563EB]" />
              {t('nav.home')}
            </Link>

            <div className="space-y-3">
              <p className="px-3 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                {t('home.categoriesTitle')}
              </p>
              <div className="space-y-1">
                {liveCalculators.map((calc) => {
                  const slug = calc.slugs[locale] ?? calc.slugs.tr;
                  // next-intl Link href and t() key types are dynamic; cast needed
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const href = `/${slug}` as any;
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const title = t(calc.titleKey as any);
                  return (
                    <Link
                      key={calc.id}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EFF6FF] text-[#475569] hover:text-[#2563EB] transition-colors group"
                    >
                      <span className="text-sm font-medium">
                        {title}
                      </span>
                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center">
            <p className="text-xs text-[#94A3B8]">
              © {new Date().getFullYear()} {t('meta.siteName')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
