'use client';

import {useEffect, useState} from 'react';
import AddToHomeScreen from './AddToHomeScreen';

export default function PlatformGuide() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as {MSStream: unknown}).MSStream);
  }, []);

  if (!isIOS) return null;
  return <AddToHomeScreen />;
}
