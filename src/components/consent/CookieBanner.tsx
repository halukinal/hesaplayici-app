'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  }

  function reject() {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A] text-white px-4 py-4 md:flex md:items-center md:gap-4"
      style={{marginBottom: 'calc(env(safe-area-inset-bottom) + 56px)'}}
    >
      <p className="text-sm flex-1">
        Bu site deneyiminizi iyileştirmek için çerezler kullanır.{' '}
        <Link href="/tr/cerez-politikasi" className="underline">Çerez Politikası</Link>
      </p>
      <div className="flex gap-2 mt-3 md:mt-0">
        <button
          onClick={reject}
          className="px-4 py-2 rounded-lg border border-white/30 text-sm font-medium hover:bg-white/10 transition-colors min-h-0 h-10"
        >
          Reddet
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 bg-[#2563EB] rounded-lg text-sm font-medium hover:bg-[#1D4ED8] transition-colors min-h-0 h-10"
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
