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
    '/genel/yuzde-hesaplama': {
      tr: '/genel/yuzde-hesaplama',
      en: '/general/percentage-calculator',
    },
    '/zaman/yas-hesaplayici': {
      tr: '/zaman/yas-hesaplayici',
      en: '/time/age-calculator',
    },
    '/mutfak/olcu-birimi-donusturucu': {
      tr: '/mutfak/olcu-birimi-donusturucu',
      en: '/kitchen/measurement-converter',
    },
    '/el-sanatlari/ip-yumak-hesaplayici': {
      tr: '/el-sanatlari/ip-yumak-hesaplayici',
      en: '/crafts/yarn-amount-calculator',
    },
    '/el-sanatlari/kumas-hesaplayici': {
      tr: '/el-sanatlari/kumas-hesaplayici',
      en: '/crafts/fabric-amount-calculator',
    },
    '/el-sanatlari/duvar-kagidi-boya-hesaplayici': {
      tr: '/el-sanatlari/duvar-kagidi-boya-hesaplayici',
      en: '/crafts/wallpaper-paint-calculator',
    },
    '/zaman/tarih-farki-hesaplayici': {
      tr: '/zaman/tarih-farki-hesaplayici',
      en: '/time/date-difference-calculator',
    },
    '/zaman/is-gunu-hesaplayici': {
      tr: '/zaman/is-gunu-hesaplayici',
      en: '/time/work-days-calculator',
    },
    '/ev/elektrik-faturasi-hesaplayici': {
      tr: '/ev/elektrik-faturasi-hesaplayici',
      en: '/home/electricity-bill-calculator',
    },
    '/ev/kira-artis-hesaplayici': {
      tr: '/ev/kira-artis-hesaplayici',
      en: '/home/rent-increase-calculator',
    },
    '/genel/not-ortalama-hesaplayici': {
      tr: '/genel/not-ortalama-hesaplayici',
      en: '/general/grade-average-calculator',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
