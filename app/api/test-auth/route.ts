import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Not authenticated",
        session: null
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Authenticated",
      session: {
        user: session.user,
        expires: session.expires
      }
    });
  } catch (error) {
    console.error('Auth test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}