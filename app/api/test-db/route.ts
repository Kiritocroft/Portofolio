import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Test basic database connection by counting projects
    const projectCount = await prisma.project.count();
    
    // Get a sample project to see its structure
    const sampleProject = await prisma.project.findFirst();
    
    return NextResponse.json({
      success: true,
      projectCount,
      sampleProject,
      message: "Database connection successful"
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}