'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AdminAccessCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const hasAccess = sessionStorage.getItem('admin_access_granted');
    if (hasAccess !== 'true') {
      router.replace('/');
    }
  }, [router]);

  if (typeof window !== 'undefined' && sessionStorage.getItem('admin_access_granted') !== 'true') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Verifying access...</p>
      </div>
    );
  }

  return <>{children}</>;
} 