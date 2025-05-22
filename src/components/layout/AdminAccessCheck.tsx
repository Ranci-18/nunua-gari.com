'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'your-secret-key';

export function AdminAccessCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check URL for admin secret
    const secret = searchParams.get('admin');
    if (secret === ADMIN_SECRET) {
      // Set both sessionStorage and localStorage for persistence
      sessionStorage.setItem('admin_access_granted', 'true');
      localStorage.setItem('admin_access_granted', 'true');
      // Remove the secret from URL without refreshing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    // Check for existing access
    const hasAccess = sessionStorage.getItem('admin_access_granted') === 'true' || 
                     localStorage.getItem('admin_access_granted') === 'true';
    
    if (!hasAccess) {
      router.replace('/');
    }
  }, [router, searchParams]);

  if (typeof window !== 'undefined' && 
      sessionStorage.getItem('admin_access_granted') !== 'true' && 
      localStorage.getItem('admin_access_granted') !== 'true') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Verifying access...</p>
      </div>
    );
  }

  return <>{children}</>;
} 