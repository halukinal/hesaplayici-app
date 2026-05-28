import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'nav'});
  return {title: t('records')};
}

export default async function RecordsPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'nav'});
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-28">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-4">{t('records')}</h1>
      <p className="text-[#64748B]">Kayıtlı hesaplamalarınız burada görünecek.</p>
    </div>
  );
}
