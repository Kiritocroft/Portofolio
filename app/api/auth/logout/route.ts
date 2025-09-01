import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  // Hapus cookie dengan mengatur maxAge ke -1
  const serializedCookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Langsung kedaluwarsa
    path: '/',
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
}