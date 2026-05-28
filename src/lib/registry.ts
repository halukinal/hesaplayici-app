export type CalculatorCategory =
  | 'saglik'
  | 'para'
  | 'mutfak'
  | 'el-sanatlari'
  | 'genel'
  | 'zaman';

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
];

export function getCalculatorsByCategory(category: CalculatorCategory) {
  return calculatorRegistry.filter(
    (c) => c.category === category && c.status === 'live',
  );
}

export function getCalculatorById(id: string) {
  return calculatorRegistry.find((c) => c.id === id);
}
