import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import CalculatorShell from '@/components/calculator/CalculatorShell';
import ElectricityCalculator from '@/components/calculator/ElectricityCalculator';
import JsonLd from '@/components/seo/JsonLd';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'electricity'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {title: t('metaTitle'), description: t('metaDescription')},
  };
}

export default async function ElectricityPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'electricity'});
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://hesapla.app';
  const canonicalUrl = locale === 'tr'
    ? `${baseUrl}/tr/ev/elektrik-faturasi-hesaplayici`
    : `${baseUrl}/en/home/electricity-bill-calculator`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebApplication',
      name: t('metaTitle'),
      description: t('metaDescription'),
      url: canonicalUrl,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      offers: {'@type': 'Offer', price: '0', priceCurrency: 'TRY'},
      inLanguage: locale,
    }],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalculatorShell title={t('title')} description={t('description')}>
        <ElectricityCalculator />
      </CalculatorShell>
      <div className="max-w-2xl mx-auto px-4 pb-28 md:pb-12">
        <p className="text-xs text-[#64748B] mt-4">{t('disclaimer')}</p>
      </div>
    </>
  );
}
