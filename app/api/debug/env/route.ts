import { NextResponse } from "next/server";

export async function GET() {
  const flags = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    NEXTAUTH_URL: Boolean(process.env.NEXTAUTH_URL),
    NEXTAUTH_SECRET: Boolean(process.env.NEXTAUTH_SECRET),
    JWT_SECRET: Boolean(process.env.JWT_SECRET),
    ADMIN_EMAIL: Boolean(process.env.ADMIN_EMAIL),
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
    NODE_ENV: process.env.NODE_ENV || "unknown",
  };

  return NextResponse.json(flags);
}
