import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import CategoryGrid from '@/components/layout/CategoryGrid';
import {calculatorRegistry} from '@/lib/registry';
import type {CalculatorCategory} from '@/lib/registry';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

function buildCategoryMap() {
  const map: Partial<Record<CalculatorCategory, typeof calculatorRegistry>> = {};
  for (const entry of calculatorRegistry) {
    if (entry.status === 'live') {
      if (!map[entry.category]) map[entry.category] = [];
      map[entry.category]!.push(entry);
    }
  }
  return map;
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  const calculatorsByCategory = buildCategoryMap();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 md:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0F172A]">{t('title')}</h1>
        <p className="mt-2 text-[#64748B] text-lg">{t('subtitle')}</p>
      </div>
      <CategoryGrid calculatorsByCategory={calculatorsByCategory} />
    </div>
  );
}
