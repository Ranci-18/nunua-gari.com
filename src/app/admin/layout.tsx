'use client';

import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// export const metadata = { // Metadata cannot be dynamically set in a client component layout easily
//   title: 'Admin Panel - Premium Auto',
//   description: 'Manage car listings and settings for Premium Auto.',
// };

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    document.title = 'Admin Panel - Premium Auto';
    const hasAccess = sessionStorage.getItem('admin_access_granted');
    if (hasAccess !== 'true') {
      router.replace('/'); // Use replace to not add to history stack
    }
  }, [router]);

  // Optional: Render a loading state or null while checking access
  // This avoids a flash of admin content if the redirect is slow.
  if (typeof window !== 'undefined' && sessionStorage.getItem('admin_access_granted') !== 'true') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Verifying access...</p>
      </div>
    ); 
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <SidebarInset className="flex-1 p-0">
            <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Admin Panel</h1>
            </header>
            <div className="p-4 md:p-8">
              {children}
            </div>
        </SidebarInset>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
