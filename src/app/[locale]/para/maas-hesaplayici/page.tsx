import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import CalculatorShell from '@/components/calculator/CalculatorShell';
import SalaryCalculator from '@/components/calculator/SalaryCalculator';
import FaqSection from '@/components/seo/FaqSection';
import JsonLd from '@/components/seo/JsonLd';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'salary'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default async function SalaryPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'salary'});

  const faqItems = [
    {question: t('faq1q'), answer: t('faq1a')},
    {question: t('faq2q'), answer: t('faq2a')},
    {question: t('faq3q'), answer: t('faq3a')},
    {question: t('faq4q'), answer: t('faq4a')},
    {question: t('faq5q'), answer: t('faq5a')},
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://hesapla.app';
  const canonicalUrl =
    locale === 'tr'
      ? `${baseUrl}/tr/para/maas-hesaplayici`
      : `${baseUrl}/en/money/salary-calculator`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: t('metaTitle'),
        description: t('metaDescription'),
        url: canonicalUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'TRY'},
        inLanguage: locale,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({question, answer}) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {'@type': 'Answer', text: answer},
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalculatorShell title={t('title')} description={t('description')}>
        <SalaryCalculator />
      </CalculatorShell>

      <div className="max-w-2xl mx-auto px-4 pb-28 md:pb-12">
        <section className="prose prose-slate max-w-none text-[#0F172A]">
          <h2 className="text-xl font-bold mt-8 mb-3">{t('contentTitle')}</h2>
          <p className="text-[#64748B] leading-relaxed">{t('contentBody1')}</p>
          <p className="text-[#64748B] leading-relaxed mt-3">{t('contentBody2')}</p>
          <p className="text-[#64748B] leading-relaxed mt-3">{t('contentBody3')}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">{t('formulaTitle')}</h3>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 font-mono text-sm text-[#0F172A] space-y-1">
            <p>{t('formulaSgk')}</p>
            <p>{t('formulaUnemployment')}</p>
            <p>{t('formulaStamp')}</p>
            <p>{t('formulaNet')}</p>
          </div>
          <p className="text-xs text-[#64748B] mt-2">{t('formulaSource')}</p>
        </section>

        <FaqSection items={faqItems} />
      </div>
    </>
  );
}
