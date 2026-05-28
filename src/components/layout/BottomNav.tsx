'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {Home, Grid2x2, BookOpen, Heart} from 'lucide-react';

const navItems = [
  {key: 'home', href: '/' as const, icon: Home, labelKey: 'nav.home'},
  {key: 'categories', href: '/' as const, icon: Grid2x2, labelKey: 'nav.categories'},
  {key: 'records', href: '/kayitlarim' as const, icon: BookOpen, labelKey: 'nav.records'},
  {key: 'favorites', href: '/favoriler' as const, icon: Heart, labelKey: 'nav.favorites'},
];

export default function BottomNav() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] md:hidden"
      style={{paddingBottom: 'env(safe-area-inset-bottom)'}}
      aria-label="Ana navigasyon"
    >
      <div className="flex">
        {navItems.map(({key, href, icon: Icon, labelKey}) => {
          const isActive = (href === '/' && pathname === '/') || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={key}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 text-xs font-medium transition-colors min-h-[56px] ${
                isActive ? 'text-[#2563EB]' : 'text-[#64748B]'
              }`}
            >
              <Icon size={22} aria-hidden />
              <span>{t(labelKey as Parameters<typeof t>[0])}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
