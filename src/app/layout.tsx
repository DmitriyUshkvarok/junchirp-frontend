import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/components/Header/Header';
import { montserrat } from '@/utils/fonts';
import Footer from '@/components/Footer/Footer';
import { Temporary } from '@/components/UI/temporary/temporary';
import s from '@/sass/layouts/main.module.scss';
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

const ReduxProvider = dynamic(
  () => import('../Providers/ReduxProvider/ReduxProvider'),
  {
    ssr: false,
  }
);

const angryFont = localFont({
  src: '../../public/fonts/Angry.otf',
});

export const metadata: Metadata = {
  title: 'JunChirp',
  description: 'JunChirp',
  openGraph: {
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image', // Или другой тип карточки
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${angryFont.className} ${montserrat.className}`}>
        <ReduxProvider>
          <Header />
          <Temporary />
          <main className={s.main}>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
