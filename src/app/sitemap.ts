import type {MetadataRoute} from 'next';
import {calculatorRegistry} from '@/lib/registry';
import {routing} from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://hesapla.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routing.locales.flatMap((locale) => [
    {url: `${BASE_URL}/${locale}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1},
    {url: `${BASE_URL}/${locale}/gizlilik`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3},
    {url: `${BASE_URL}/${locale}/kullanim-sartlari`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3},
    {url: `${BASE_URL}/${locale}/cerez-politikasi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3},
    {url: `${BASE_URL}/${locale}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3},
  ]);

  const calculatorPages = calculatorRegistry
    .filter((c) => c.status === 'live')
    .flatMap((c) =>
      routing.locales.map((locale) => {
        const slug = c.slugs[locale] ?? c.id;
        return {
          url: `${BASE_URL}/${locale}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      }),
    );

  return [...staticPages, ...calculatorPages];
}
