import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only handle admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow all admin routes - authorization is handled by AdminAccessCheck
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 