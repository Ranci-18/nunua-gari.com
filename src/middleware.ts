import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only handle admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow the verify endpoint and admin layout to be accessed
  if (request.nextUrl.pathname === '/api/admin/verify' || 
      request.nextUrl.pathname === '/admin') {
    return NextResponse.next();
  }

  // No valid access, redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/admin/:path*']
}; 