import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stylix (Ashu) — Developer & Tool Maker',
  description:
    'Creative developer building automation, low-level software, and tools that make repetitive work disappear.',
  keywords: [
    'Stylix',
    'Ashu',
    'Creative Developer',
    'Automation',
    'Telegram Bot',
    'Discord Bot',
    'Android',
    'Kotlin',
    'StorageIQ',
    'Python',
    'Tool Maker',
  ],
  authors: [{ name: 'Ashu (Stylix)' }],
  creator: 'Ashu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Stylix (Ashu) — Developer & Tool Maker',
    description:
      'Creative developer building automation, low-level software, and tools that make repetitive work disappear.',
    siteName: 'Stylix Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stylix (Ashu) — Developer & Tool Maker',
    description:
      'Creative developer building automation, low-level software, and tools that make repetitive work disappear.',
    creator: '@stylixXD',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#111113',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#111113] text-[#F4F3EE]">
      <body className="antialiased bg-[#111113] text-[#F4F3EE] overflow-x-hidden selection:bg-[#CEFF00] selection:text-[#111113]">
        {children}
      </body>
    </html>
  );
}
