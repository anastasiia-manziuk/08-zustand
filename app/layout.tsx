import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';


import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider';


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is a simple and efficient application for managing personal notes, helping you keep your thoughts organized and accessible anywhere.',
  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub is a simple and efficient application for managing personal notes, helping you keep your thoughts organized and accessible anywhere.',
    url: 'https://08-zustand-taupe-one.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal:React.ReactNode;
}

export default function RootLayout({ children,modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanstackProvider>
          <Header />
          
          {children}
          <Footer />
          {modal}
          <div id="modal-root" />
        </TanstackProvider>
      </body>
    </html>
  );
}
