import type { Metadata, Viewport } from 'next';
import { Poppins, Roboto } from 'next/font/google';

import { env } from '@/infra/env';
import { ModalStore } from '@/shared/store/use-modal-store/ui/modal-store';
import { NextAuthSessionProvider } from '@/shared/ui/contexts/session-provider';

import './globals.scss';

const roboto = Roboto({
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

const poppins = Poppins({
  variable: '--font-secondary',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  const robotsEnabled = env.ENABLE_ROBOTS;
  const imageUrl = `${env.HOST}/images/og-image.jpg`;

  return {
    title: {
      default: 'DineWise | Seu site para gestão de restaurantes',
      template: '%s | DineWise',
    },
    description:
      'Dinewise é uma solução online para gerenciar seus restaurantes e refeitório de forma prática e rápida. Cadastre os seus insumos, pratos, cardápios e acompanhe os indicadores AQPC.',
    keywords: [
      'DineWise',
      'Gestão',
      'Restaurantes',
      'Cardápio',
      'Insumos',
      'Preparos',
      'AQPC',
      'Análises',
    ],
    publisher: 'DineWise',
    authors: [
      {
        name: 'DineWise',
        url: 'https://dinewise-staging.azurewebsites.net',
      },
    ],
    other: {
      distribution: 'Global',
      'doc-class': 'Completed',
      expires: 'nerver',
      rating: 'Geral',
    },
    robots: { index: robotsEnabled, follow: robotsEnabled },
    openGraph: {
      title: 'DineWise | Seu site para gestão de restaurantes',
      description:
        'Gerencie seus restaurantes e refeitórios com DineWise, de forma prática e eficiente.',
      url: env.HOST,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: 'Logo DineWise',
        },
      ],
      siteName: 'DineWise',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DineWise | Seu site para gestão de restaurantes',
      description:
        'Gerencie seus restaurantes e refeitórios com DineWise, de forma prática e eficiente.',
      images: [imageUrl],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: 'light',
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  themeColor: '#0A6BAF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={`${poppins.variable} ${roboto.variable} bg-functional-soft-dark`}>
      <head>
        <link rel='preconnect' href={env.API_URL} />
      </head>
      <body className='font-primary bg-functional-soft-dark'>
        <NextAuthSessionProvider>
          {children}
          <ModalStore />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
