import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "nabilganteng03@gmail.com";
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (adminUser) {
      return NextResponse.json({
        success: true,
        message: "Admin user exists",
        userId: adminUser.id,
        email: adminUser.email
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Admin user not found"
      });
    }
  } catch (error: any) {
    console.error("Error checking admin user:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}