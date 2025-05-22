'use client';

import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { AdminAccessCheck } from '@/components/layout/AdminAccessCheck';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAccessCheck>
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
    </AdminAccessCheck>
  );
}
