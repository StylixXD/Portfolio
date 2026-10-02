import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stylix Portfolio',
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
  themeColor: '#0B1317',
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
    <html lang="en" className="dark bg-[#0B1317] text-[#F4F6F7]">
      <body className="antialiased bg-[#0B1317] text-[#F4F6F7] overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#0B1317]">
        {children}
      </body>
    </html>
  );
}
