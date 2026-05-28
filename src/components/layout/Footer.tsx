import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('legal');
  const meta = useTranslations('meta');

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-6 pb-24 md:pb-6 text-sm text-[#64748B]">
      <div className="max-w-2xl mx-auto flex flex-wrap gap-4 justify-center">
        <Link href="/gizlilik" className="hover:text-[#2563EB] transition-colors min-h-0">
          {t('privacy')}
        </Link>
        <Link href="/kullanim-sartlari" className="hover:text-[#2563EB] transition-colors min-h-0">
          {t('terms')}
        </Link>
        <Link href="/cerez-politikasi" className="hover:text-[#2563EB] transition-colors min-h-0">
          {t('cookies')}
        </Link>
        <Link href="/iletisim" className="hover:text-[#2563EB] transition-colors min-h-0">
          {t('contact')}
        </Link>
      </div>
      <p className="text-center mt-4 text-xs">
        © {new Date().getFullYear()} {meta('siteName')}
      </p>
    </footer>
  );
}
