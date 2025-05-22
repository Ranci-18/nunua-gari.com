import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  if (password === process.env.ADMIN_PASSWORD) {
    return new NextResponse(null, { status: 200 });
  }
  
  return new NextResponse(null, { status: 401 });
} 