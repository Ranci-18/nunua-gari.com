'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function AdminAccessCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      setIsVerifying(true);
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
            // Set both sessionStorage and localStorage for persistence
            sessionStorage.setItem('admin_access_granted', 'true');
            localStorage.setItem('admin_access_granted', 'true');
            // Remove the secret from URL without refreshing
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
          } else {
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
      } catch (error) {
        console.error('Error verifying admin access:', error);
        router.replace('/');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, [router, searchParams]);

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Verifying access...</p>
      </div>
    );
  }

  return <>{children}</>;
} 