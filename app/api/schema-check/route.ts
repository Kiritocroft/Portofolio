import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Checking database schema...");
    
    // Check if projects table exists
    const projectCount = await prisma.project.count();
    console.log(`✅ Projects table exists with ${projectCount} records`);
    
    // Try to get project structure
    const sampleProject = await prisma.project.findFirst();
    console.log("✅ Sample project structure:", Object.keys(sampleProject || {}));
    
    // Check if link field exists by trying to query it
    try {
      const projectWithLink = await prisma.project.findMany({
        select: {
          id: true,
          title: true,
          link: true,
        },
        take: 1,
      });
      console.log("✅ Link field exists in projects table");
      console.log("Sample with link:", projectWithLink[0]);
      
      return NextResponse.json({
        success: true,
        message: "Schema is up to date with link field",
        projectCount,
        sampleProjectKeys: Object.keys(sampleProject || {}),
        linkFieldExists: true,
        sampleWithLink: projectWithLink[0]
      });
    } catch (linkError: any) {
      console.log("❌ Link field does not exist in projects table");
      console.log("Link error:", linkError.message);
      
      return NextResponse.json({
        success: false,
        message: "Link field missing from projects table",
        projectCount,
        sampleProjectKeys: Object.keys(sampleProject || {}),
        linkFieldExists: false,
        error: linkError.message
      });
    }
    
  } catch (error: any) {
    console.error("❌ Error checking schema:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}