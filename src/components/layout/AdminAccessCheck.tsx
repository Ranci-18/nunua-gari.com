'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function AdminAccessCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        // Check URL for admin secret
        const secret = searchParams.get('admin');
        
        if (secret) {
          const response = await fetch('/api/admin/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secret }),
          });

          const data = await response.json();
          
          if (data.success) {
            // Remove the secret from URL without refreshing
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            router.replace('/');
          }
        } else {
          // Check for existing access cookie
          const hasAccess = document.cookie.includes('admin_access=true');
          
          if (hasAccess) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            router.replace('/');
          }
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        setIsAuthorized(false);
        router.replace('/');
      }
    };

    verifyAccess();
  }, [router, searchParams]);

  // Show nothing while checking authorization
  if (isAuthorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authorized (will be redirected)
  if (!isAuthorized) {
    return null;
  }

  // Show content only if authorized
  return <>{children}</>;
} 