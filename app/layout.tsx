import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Footer from './components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marketech - Tu tienda de tecnología',
  description: 'Encuentra los mejores productos de tecnología al mejor precio',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

