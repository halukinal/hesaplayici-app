import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hesapla',
  description: 'Günlük hesaplamalar, kolayca.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return children;
}
