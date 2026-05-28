import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import CookieBanner from '@/components/consent/CookieBanner';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  return {
    title: {default: t('siteName'), template: `%s | ${t('siteName')}`},
    description: t('siteDescription'),
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as 'tr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BottomNav />
          <InstallPrompt />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
