import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal'});
  return {title: t('privacy')};
}

export default async function PrivacyPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal'});
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-28">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-4">{t('privacy')}</h1>
      <p className="text-[#64748B] leading-relaxed mb-8">{t('privacyContent')}</p>

      <h2 className="text-xl font-bold text-[#0F172A] mb-4">{t('kvkkTitle')}</h2>
      <p className="text-[#64748B] leading-relaxed">{t('kvkkContent')}</p>
    </div>
  );
}
