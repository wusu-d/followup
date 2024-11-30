import { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { getServerSession } from 'next-auth';
import * as React from 'react';
import { Toaster } from 'sonner';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

import { NextAuthProvider } from '@/components/next-auth-provider';
import NullResponsiveWrapper from '@/components/null-responsive-wrapper/NullResponsiveWrapper';
import Progressbar from '@/components/ProgressBar';
import { ReduxProvider } from '@/components/redux-provider';

import { authOptions } from '@/app/_lib/auth';
import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },

  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

const manrope = Manrope({
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // console.log(session);
  // const sessionKey = new Date().valueOf();

  return (
    <html lang='en-us' className={cn(manrope.variable, inter.variable)}>
      <body>
        {/* <head>
          <script
            src='https://unpkg.com/react-scan/dist/auto.global.js'
            async
          ></script>
        </head> */}
        <NextAuthProvider session={session}>
          <ReduxProvider>
            <Toaster />
            <Progressbar />
            <NullResponsiveWrapper>{children}</NullResponsiveWrapper>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
