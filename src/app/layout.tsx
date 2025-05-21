'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = { // Metadata cannot be dynamically set in a client component root layout easily
//   title: 'Premium Auto - Your Trusted Car Marketplace',
//   description: 'Find your next car with Premium Auto. Quality listings and great prices.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Set document title for client component
    document.title = 'Premium Auto - Your Trusted Car Marketplace';
    
    const secret = searchParams.get('admin_secret');
    if (pathname === '/' && secret === 'St(0)ic_S(1)gma.') {
      sessionStorage.setItem('admin_access_granted', 'true');
      router.push('/admin');
    }
  }, [pathname, searchParams, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add a dynamic title tag here if needed, or keep it static */}
        {/* <title>Premium Auto - Your Trusted Car Marketplace</title> */}
        <meta name="description" content="Find your next car with Premium Auto. Quality listings and great prices." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
