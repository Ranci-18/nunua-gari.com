'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function AdminAccessCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyAccess = async () => {
      // Check URL for admin secret
      const secret = searchParams.get('admin');
      
      if (secret) {
        try {
          const response = await fetch('/api/admin/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secret }),
          });

          const data = await response.json();
          
          if (data.success) {
            // Set both sessionStorage and localStorage for persistence
            sessionStorage.setItem('admin_access_granted', 'true');
            localStorage.setItem('admin_access_granted', 'true');
            // Remove the secret from URL without refreshing
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
          } else {
            router.replace('/');
          }
        } catch (error) {
          console.error('Error verifying admin access:', error);
          router.replace('/');
        }
      } else {
        // Check for existing access
        const hasAccess = sessionStorage.getItem('admin_access_granted') === 'true' || 
                         localStorage.getItem('admin_access_granted') === 'true';
        
        if (!hasAccess) {
          router.replace('/');
        }
      }
    };

    verifyAccess();
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