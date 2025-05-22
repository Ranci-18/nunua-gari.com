import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the admin secret from the URL
    const adminSecret = request.nextUrl.searchParams.get('admin');
    
    // Check if the secret matches
    if (adminSecret === process.env.ADMIN_SECRET) {
      // Set the admin access cookie
      const response = NextResponse.next();
      response.cookies.set('admin_access', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return response;
    }

    // Check for existing admin access cookie
    const hasAccess = request.cookies.get('admin_access')?.value === 'true';
    
    if (!hasAccess) {
      // Redirect to home if no access
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 