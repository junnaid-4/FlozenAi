import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    template: '%s | FlozenAI',
    default: 'FlozenAI - We build AI automations that work',
  },
  description: 'Pre-built n8n automations, custom AI workflows, and practical courses for Pakistani businesses and freelancers.',
  openGraph: {
    title: 'FlozenAI',
    description: 'Automate your workflows with pre-built n8n solutions and courses.',
    url: 'https://flozenai.co',
    siteName: 'FlozenAI',
    images: [
      {
        url: '/og/og-default.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
};

import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ChatbotFloat } from '@/components/ChatbotFloat';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/context/ThemeContext';
import CustomCursor from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import SplashScreen from '@/components/ui/SplashScreen';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';

import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${plusJakarta.variable} ${dmMono.variable} antialiased min-h-screen flex flex-col transition-colors duration-300`}>
        <SplashScreen>
          <ThemeProvider>
            <SmoothScrollProvider>
              <ScrollProgress />
              <CustomCursor />
              <Nav />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <ChatbotFloat />
              <Analytics />
            </SmoothScrollProvider>
          </ThemeProvider>
        </SplashScreen>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('flozen-theme') || 'sapphire-luxe-dark';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme.endsWith('-light')) {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (_) {}
            `,
          }}
        ></script>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
             __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'G-XXXXXXXXXX', { page_path: window.location.pathname });
             `
          }}
        ></Script>
      </body>
    </html>
  );
}
