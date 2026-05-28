'use client';

import {useEffect, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Heart, ArrowRight} from 'lucide-react';
import {getAllFavorites, removeFavorite} from '@/lib/storage/favorites';
import type {FavoriteRecord} from '@/lib/storage/db';
import {calculatorRegistry} from '@/lib/registry';

export default function FavoritesList() {
  const t = useTranslations();
  const locale = useLocale();
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllFavorites().then((data) => {
      setFavorites(data);
      setLoaded(true);
    });
  }, []);

  async function handleRemove(calculatorId: string) {
    await removeFavorite(calculatorId);
    setFavorites((prev) => prev.filter((f) => f.calculatorId !== calculatorId));
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <Heart size={48} className="text-[#E2E8F0]" />
        <p className="text-[#64748B] text-lg">{t('favorites.empty')}</p>
        <Link
          href="/"
          className="text-[#2563EB] font-medium flex items-center gap-1 hover:underline"
        >
          {t('common.backToHome')} <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {favorites.map((fav) => {
        const calc = calculatorRegistry.find((c) => c.id === fav.calculatorId);
        if (!calc) return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const title = t(calc.titleKey as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const description = t(calc.descriptionKey as any);
        const slug = calc.slugs[locale] ?? calc.slugs.tr;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const href = `/${slug}` as any;

        return (
          <div
            key={fav.calculatorId}
            className="flex items-center gap-4 bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:border-[#2563EB] transition-colors"
          >
            <Link href={href} className="flex-1 min-w-0">
              <p className="font-semibold text-[#0F172A] truncate">{title}</p>
              <p className="text-sm text-[#64748B] truncate">{description}</p>
            </Link>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={href}
                className="flex items-center gap-1 px-3 py-2 bg-[#EFF6FF] text-[#2563EB] rounded-xl text-sm font-medium hover:bg-[#DBEAFE] transition-colors"
              >
                {t('favorites.open')} <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(fav.calculatorId)}
                aria-label={t('common.unfavorite')}
                className="p-2 rounded-xl hover:bg-[#FFF1F2] transition-colors"
              >
                <Heart size={20} className="fill-rose-500 text-rose-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
