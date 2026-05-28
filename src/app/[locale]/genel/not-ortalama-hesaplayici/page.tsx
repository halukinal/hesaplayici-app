import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import CalculatorShell from '@/components/calculator/CalculatorShell';
import GradeCalculator from '@/components/calculator/GradeCalculator';
import JsonLd from '@/components/seo/JsonLd';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'grade'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {title: t('metaTitle'), description: t('metaDescription')},
  };
}

export default async function GradePage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'grade'});
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://hesapla.app';
  const canonicalUrl = locale === 'tr'
    ? `${baseUrl}/tr/genel/not-ortalama-hesaplayici`
    : `${baseUrl}/en/general/grade-average-calculator`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebApplication',
      name: t('metaTitle'),
      description: t('metaDescription'),
      url: canonicalUrl,
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Any',
      offers: {'@type': 'Offer', price: '0', priceCurrency: 'TRY'},
      inLanguage: locale,
    }],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalculatorShell title={t('title')} description={t('description')}>
        <GradeCalculator />
      </CalculatorShell>
    </>
  );
}
