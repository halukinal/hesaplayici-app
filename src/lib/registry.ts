export type CalculatorCategory =
  | 'saglik'
  | 'para'
  | 'mutfak'
  | 'el-sanatlari'
  | 'genel'
  | 'zaman'
  | 'ev';

export type CalculatorStatus = 'live' | 'draft';

export interface CalculatorEntry {
  id: string;
  category: CalculatorCategory;
  icon: string;                       // Lucide icon name
  slugs: Record<string, string>;      // locale → path (relative to locale root)
  titleKey: string;                   // next-intl message key
  descriptionKey: string;
  keywords: string[];
  hasHistory: boolean;
  status: CalculatorStatus;
}

/**
 * Merkezi hesaplayıcı kayıt defteri.
 * Ana sayfa, sitemap, navigasyon buradan beslenir.
 * Yeni hesaplayıcı eklemek için: docs/CALCULATOR-RECIPE.md §adım 6
 */
export const calculatorRegistry: CalculatorEntry[] = [
  {
    id: 'vat',
    category: 'para',
    icon: 'Receipt',
    slugs: {
      tr: 'para/kdv-hesaplayici',
      en: 'money/vat-calculator',
    },
    titleKey: 'vat.title',
    descriptionKey: 'vat.description',
    keywords: ['kdv hesaplama', 'kdv hesaplayici', 'kdv ekle', 'kdv cikar', 'net brüt'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'calorie',
    category: 'saglik',
    icon: 'Activity',
    slugs: {
      tr: 'saglik/kalori-hesaplayici',
      en: 'health/calorie-calculator',
    },
    titleKey: 'calorie.title',
    descriptionKey: 'calorie.description',
    keywords: ['kalori hesaplama', 'bmr hesaplama', 'tdee hesaplama', 'bmi hesaplama', 'günlük kalori'],
    hasHistory: true,
    status: 'live',
  },
  {
    id: 'salary',
    category: 'para',
    icon: 'Banknote',
    slugs: {
      tr: 'para/maas-hesaplayici',
      en: 'money/salary-calculator',
    },
    titleKey: 'salary.title',
    descriptionKey: 'salary.description',
    keywords: ['maaş hesaplama', 'net brüt maaş', 'sgk hesaplama', 'salary calculator turkey', 'maas hesaplayici'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'knitting-cost',
    category: 'el-sanatlari',
    icon: 'Scissors',
    slugs: {
      tr: 'el-sanatlari/orgu-maliyet-hesaplayici',
      en: 'crafts/knitting-cost-calculator',
    },
    titleKey: 'knitting.title',
    descriptionKey: 'knitting.description',
    keywords: ['örgü maliyeti', 'satış fiyatı hesaplama', 'el emeği fiyatlandırma', 'knitting cost', 'craft calculator'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'percentage',
    category: 'genel',
    icon: 'Percent',
    slugs: {
      tr: 'genel/yuzde-hesaplama',
      en: 'general/percentage-calculator',
    },
    titleKey: 'percentage.title',
    descriptionKey: 'percentage.description',
    keywords: ['yüzde hesaplama', 'yüzde bulma', 'yüzde artış', 'yüzde azalış', 'oran hesaplama'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'age',
    category: 'zaman',
    icon: 'Calendar',
    slugs: {
      tr: 'zaman/yas-hesaplayici',
      en: 'time/age-calculator',
    },
    titleKey: 'age.title',
    descriptionKey: 'age.description',
    keywords: ['yaş hesaplama', 'kaç yaşındayım', 'doğum tarihi hesaplama', 'gün ay yıl yaş', 'bebek ay hesaplama'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'yarn-amount',
    category: 'el-sanatlari',
    icon: 'Scissors',
    slugs: {
      tr: 'el-sanatlari/ip-yumak-hesaplayici',
      en: 'crafts/yarn-amount-calculator',
    },
    titleKey: 'yarn.title',
    descriptionKey: 'yarn.description',
    keywords: ['ip hesaplama', 'yumak hesaplama', 'örgü ip miktarı', 'kaç yumak lazım', 'yarn calculator'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'fabric-amount',
    category: 'el-sanatlari',
    icon: 'Scissors',
    slugs: {
      tr: 'el-sanatlari/kumas-hesaplayici',
      en: 'crafts/fabric-amount-calculator',
    },
    titleKey: 'fabric.title',
    descriptionKey: 'fabric.description',
    keywords: ['kumaş hesaplama', 'kaç metre kumaş lazım', 'perde kumaş', 'elbise kumaş', 'fabric calculator'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'wallpaper-paint',
    category: 'el-sanatlari',
    icon: 'PaintBucket',
    slugs: {
      tr: 'el-sanatlari/duvar-kagidi-boya-hesaplayici',
      en: 'crafts/wallpaper-paint-calculator',
    },
    titleKey: 'wallpaint.title',
    descriptionKey: 'wallpaint.description',
    keywords: ['duvar kağıdı hesaplama', 'boya hesaplama', 'kaç rulo duvar kağıdı', 'kaç litre boya lazım', 'wallpaper calculator'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'date-diff',
    category: 'zaman',
    icon: 'CalendarDays',
    slugs: {
      tr: 'zaman/tarih-farki-hesaplayici',
      en: 'time/date-difference-calculator',
    },
    titleKey: 'dateDiff.title',
    descriptionKey: 'dateDiff.description',
    keywords: ['tarih farkı hesaplama', 'iki tarih arası gün', 'kaç gün kaldı', 'date difference calculator', 'gün sayısı'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'work-days',
    category: 'zaman',
    icon: 'Briefcase',
    slugs: {
      tr: 'zaman/is-gunu-hesaplayici',
      en: 'time/work-days-calculator',
    },
    titleKey: 'workDays.title',
    descriptionKey: 'workDays.description',
    keywords: ['iş günü hesaplama', 'çalışma günü', 'iş günü sayısı', 'work days calculator', 'business days'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'electricity-bill',
    category: 'ev',
    icon: 'Zap',
    slugs: {
      tr: 'ev/elektrik-faturasi-hesaplayici',
      en: 'home/electricity-bill-calculator',
    },
    titleKey: 'electricity.title',
    descriptionKey: 'electricity.description',
    keywords: ['elektrik faturası hesaplama', 'elektrik tüketimi', 'aylık elektrik maliyeti', 'electricity bill calculator', 'kwh hesaplama'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'rent-increase',
    category: 'ev',
    icon: 'Home',
    slugs: {
      tr: 'ev/kira-artis-hesaplayici',
      en: 'home/rent-increase-calculator',
    },
    titleKey: 'rentIncrease.title',
    descriptionKey: 'rentIncrease.description',
    keywords: ['kira artış hesaplama', 'kira zammı', 'yeni kira', 'rent increase calculator', 'kira hesaplayıcı'],
    hasHistory: false,
    status: 'live',
  },
  {
    id: 'grade-average',
    category: 'genel',
    icon: 'GraduationCap',
    slugs: {
      tr: 'genel/not-ortalama-hesaplayici',
      en: 'general/grade-average-calculator',
    },
    titleKey: 'grade.title',
    descriptionKey: 'grade.description',
    keywords: ['not ortalaması hesaplama', 'ağırlıklı not ortalaması', 'okul notu hesaplama', 'grade average calculator', 'gpa hesaplama'],
    hasHistory: false,
    status: 'live',
  },
];

export function getCalculatorsByCategory(category: CalculatorCategory) {
  return calculatorRegistry.filter(
    (c) => c.category === category && c.status === 'live',
  );
}

export function getCalculatorById(id: string) {
  return calculatorRegistry.find((c) => c.id === id);
}
