import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hesapla',
    short_name: 'Hesapla',
    description: 'Günlük hesaplamalar, kolayca.',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#2563EB',
    orientation: 'portrait',
    categories: ['utilities', 'productivity'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      // Popüler hesaplayıcılar Faz 1'de eklenecek
      // Örnek:
      // {
      //   name: 'KDV Hesapla',
      //   url: '/tr/para/kdv-hesaplayici',
      //   icons: [{src: '/icons/icon-96.png', sizes: '96x96'}],
      // },
    ],
  };
}
