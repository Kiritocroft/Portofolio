import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-secret-key');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('authToken')?.value;

  let isAuthenticated = false;
  if (authToken) {
    try {
      await jwtVerify(authToken, JWT_SECRET);
      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }
  }

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