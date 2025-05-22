import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { secret } = await request.json();
  
  // Compare with server-side environment variable
  if (secret === process.env.ADMIN_SECRET) {
    const response = NextResponse.json({ success: true });
    
    // Set the admin access cookie
    response.cookies.set('admin_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return response;
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
} 