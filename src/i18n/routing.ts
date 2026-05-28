import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/gizlilik': {
      tr: '/gizlilik',
      en: '/privacy',
    },
    '/kullanim-sartlari': {
      tr: '/kullanim-sartlari',
      en: '/terms',
    },
    '/cerez-politikasi': {
      tr: '/cerez-politikasi',
      en: '/cookie-policy',
    },
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact',
    },
    '/favoriler': {
      tr: '/favoriler',
      en: '/favorites',
    },
    '/kayitlarim': {
      tr: '/kayitlarim',
      en: '/my-records',
    },
    '/para/maas-hesaplayici': {
      tr: '/para/maas-hesaplayici',
      en: '/money/salary-calculator',
    },
    '/para/kdv-hesaplayici': {
      tr: '/para/kdv-hesaplayici',
      en: '/money/vat-calculator',
    },
    '/saglik/kalori-hesaplayici': {
      tr: '/saglik/kalori-hesaplayici',
      en: '/health/calorie-calculator',
    },
    '/el-sanatlari/orgu-maliyet-hesaplayici': {
      tr: '/el-sanatlari/orgu-maliyet-hesaplayici',
      en: '/crafts/knitting-cost-calculator',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
