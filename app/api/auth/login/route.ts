import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key'; // Ganti dengan secret key Anda dari .env

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Ganti dengan logika otentikasi database Anda
  if (email === 'admin@gmail.com' && password === 'admin') {
    // Kredensial valid, buat token
    const token = sign(
      { email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    // Atur token dalam cookie yang aman dan httpOnly
    const serializedCookie = serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 jam
      path: '/',
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    });
  } else {
    // Kredensial tidak valid
    return new NextResponse(JSON.stringify({ success: false, message: 'Email atau password salah' }), {
      status: 401,
    });
  }
}