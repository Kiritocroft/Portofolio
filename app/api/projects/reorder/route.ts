import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectIds } = await request.json();
    
    if (!Array.isArray(projectIds)) {
      return NextResponse.json({ error: "Project IDs must be an array" }, { status: 400 });
    }

    // Update order for each project
    const updatePromises = projectIds.map((id: string, index: number) =>
      prisma.project.update({
        where: { id },
        data: { order: index }
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering projects:", error);
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}