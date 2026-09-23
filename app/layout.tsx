import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://linkup-collaboration-demo.cyannsyin.chatgpt.site'),
  title: 'LinkUp · 企业协作智能',
  description: '基于真实工作产出，为新任务找到合适的人、互补能力与可复用经验。',
  openGraph: {
    title: 'LinkUp · 让新任务，找到对的人',
    description: '基于真实工作产出的企业协作智能',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkUp · 让新任务，找到对的人',
    description: '基于真实工作产出的企业协作智能',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
