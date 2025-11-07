import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Checking if 'link' column exists in Project table...");
    
    // Try to query the projects table with the link field
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        link: true,
      },
      take: 1,
    });
    
    // Check if we can create a project with a link
    const testProject = await prisma.project.create({
      data: {
        title: "Test Project",
        description: "Test Description",
        tags: "test",
        imageUrl: "/test.png",
        link: "https://example.com",
      },
      select: {
        id: true,
        title: true,
        link: true,
      }
    });
    
    // Clean up - delete the test project
    await prisma.project.delete({
      where: {
        id: testProject.id,
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Schema is up to date with link field",
      sampleProject: projects[0],
      testProject: testProject
    });
  } catch (error: any) {
    console.error("Error checking schema:", error);
    
    // Try a simpler query to see what fields are available
    try {
      const projects = await prisma.project.findMany({
        take: 1,
      });
      return NextResponse.json({
        success: false,
        error: error.message,
        simpleQueryWorks: true,
        sampleProject: projects[0]
      });
    } catch (simpleError: any) {
      return NextResponse.json({
        success: false,
        error: error.message,
        simpleQueryError: simpleError.message
      }, { status: 500 });
    }
  } finally {
    await prisma.$disconnect();
  }
}