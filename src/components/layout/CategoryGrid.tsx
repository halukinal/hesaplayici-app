'use client';

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import {Heart, DollarSign, ChefHat, Scissors, Calculator, Calendar, ChevronRight} from 'lucide-react';
import type {CalculatorCategory, CalculatorEntry} from '@/lib/registry';

interface CategoryInfo {
  id: CalculatorCategory;
  icon: React.ComponentType<{size?: number; className?: string; 'aria-hidden'?: boolean}>;
  titleKey: string;
  descKey: string;
  color: string;
}

const CATEGORIES: CategoryInfo[] = [
  {id: 'saglik', icon: Heart, titleKey: 'categories.saglik', descKey: 'categories.saglikDesc', color: 'text-rose-500'},
  {id: 'para', icon: DollarSign, titleKey: 'categories.para', descKey: 'categories.paraDesc', color: 'text-emerald-600'},
  {id: 'mutfak', icon: ChefHat, titleKey: 'categories.mutfak', descKey: 'categories.mutfakDesc', color: 'text-orange-500'},
  {id: 'el-sanatlari', icon: Scissors, titleKey: 'categories.el-sanatlari', descKey: 'categories.el-sanatlariDesc', color: 'text-purple-500'},
  {id: 'genel', icon: Calculator, titleKey: 'categories.genel', descKey: 'categories.genelDesc', color: 'text-[#2563EB]'},
  {id: 'zaman', icon: Calendar, titleKey: 'categories.zaman', descKey: 'categories.zamanDesc', color: 'text-cyan-600'},
];

interface Props {
  calculatorsByCategory: Partial<Record<CalculatorCategory, CalculatorEntry[]>>;
}

export default function CategoryGrid({calculatorsByCategory}: Props) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section aria-label={t('home.categoriesTitle')}>
      <h2 className="text-xl font-bold text-[#0F172A] mb-4">
        {t('home.categoriesTitle')}
      </h2>
      <div className="space-y-4">
        {CATEGORIES.map(({id, icon: Icon, titleKey, descKey, color}) => {
          const calculators = calculatorsByCategory[id] ?? [];
          return (
            <div
              key={id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon size={28} className={color} aria-hidden />
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-[#64748B] text-sm">
                    {t(descKey as Parameters<typeof t>[0])}
                  </p>
                </div>
              </div>

              {calculators.length > 0 ? (
                <div className="space-y-1">
                  {calculators.map((calc) => {
                    const slug = calc.slugs[locale] ?? calc.slugs.tr;
                    return (
                      <Link
                        key={calc.id}
                        href={`/${locale}/${slug}`}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors min-h-[48px] group"
                      >
                        <span className="font-medium text-[#0F172A] text-base">
                          {t(calc.titleKey as Parameters<typeof t>[0])}
                        </span>
                        <ChevronRight size={18} className="text-[#64748B] group-hover:text-[#2563EB]" aria-hidden />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-[#64748B] italic">
                  {t('home.noCalculators')}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
