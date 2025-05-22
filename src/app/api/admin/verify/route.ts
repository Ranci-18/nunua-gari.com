import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { secret } = await request.json();
  
  // Compare with server-side environment variable
  if (secret === process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
} 