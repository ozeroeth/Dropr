import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Inter({ variable: '--font-inter', subsets: ['latin'] });
const geistMono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dropr — Your alpha command center',
  description: 'Track airdrops, testnets, research notes, and alpha signals in one futuristic command center.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
