import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get database URL (without sensitive info)
    const dbUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
    let dbInfo = "Not configured";
    if (dbUrl) {
      try {
        const url = new URL(dbUrl);
        dbInfo = `${url.protocol}//${url.hostname}:${url.port || 5432}${url.pathname}`;
      } catch {
        dbInfo = "URL parsing failed";
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      database: dbInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}