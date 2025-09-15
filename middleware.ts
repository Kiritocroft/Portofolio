import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  // Jika sudah login dan mencoba mengakses /login, redirect ke /admin
  if (isAuthenticated && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Jika belum login dan mencoba mengakses /admin, redirect ke /login
  if (!isAuthenticated && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}