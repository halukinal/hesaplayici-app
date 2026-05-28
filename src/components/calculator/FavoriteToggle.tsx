'use client';

import {useState, useEffect} from 'react';
import {Heart} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {addFavorite, removeFavorite, isFavorite} from '@/lib/storage/favorites';

interface Props {
  calculatorId: string;
}

export default function FavoriteToggle({calculatorId}: Props) {
  const t = useTranslations('common');
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(calculatorId).then(setFavorited);
  }, [calculatorId]);

  async function toggle() {
    if (favorited) {
      await removeFavorite(calculatorId);
      setFavorited(false);
    } else {
      await addFavorite(calculatorId);
      setFavorited(true);
      if ('vibrate' in navigator) navigator.vibrate(30);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={favorited ? t('unfavorite') : t('favorite')}
      aria-pressed={favorited}
      className="p-2 rounded-xl transition-colors hover:bg-[#FFF1F2] min-h-[48px] min-w-[48px] flex items-center justify-center"
    >
      <Heart
        size={22}
        className={favorited ? 'fill-rose-500 text-rose-500' : 'text-[#64748B]'}
        aria-hidden
      />
    </button>
  );
}
