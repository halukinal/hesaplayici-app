'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {X, Download} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
}

export default function InstallPrompt() {
  const t = useTranslations('pwa');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // 2. ziyarette göster (localStorage ile sayaç)
      const visits = parseInt(localStorage.getItem('visits') ?? '0') + 1;
      localStorage.setItem('visits', String(visits));
      if (visits >= 2 && !localStorage.getItem('installDismissed')) {
        setVisible(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') setVisible(false);
    setDeferredPrompt(null);
  }

  function dismiss() {
    setVisible(false);
    localStorage.setItem('installDismissed', '1');
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('installTitle')}
      className="fixed bottom-20 left-4 right-4 z-50 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg p-4 md:max-w-sm md:left-auto md:right-4"
    >
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 text-[#64748B] hover:text-[#0F172A] min-h-0 h-8 w-8 flex items-center justify-center"
        aria-label="Kapat"
      >
        <X size={16} aria-hidden />
      </button>
      <div className="flex gap-3 items-start pr-6">
        <Download size={24} className="text-[#2563EB] shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="font-semibold text-[#0F172A]">{t('installTitle')}</p>
          <p className="text-sm text-[#64748B] mt-1">{t('installDesc')}</p>
        </div>
      </div>
      <button
        onClick={install}
        className="mt-3 w-full bg-[#2563EB] text-white rounded-xl py-2 font-semibold text-base hover:bg-[#1D4ED8] transition-colors"
      >
        {t('install')}
      </button>
    </div>
  );
}
