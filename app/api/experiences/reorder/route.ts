import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { experienceIds } = await request.json();
    
    if (!Array.isArray(experienceIds)) {
      return NextResponse.json({ error: "Experience IDs must be an array" }, { status: 400 });
    }

    // Update order for each experience
    const updatePromises = experienceIds.map((id: string, index: number) =>
      prisma.experience.update({
        where: { id },
        data: { order: index }
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering experiences:", error);
    return NextResponse.json({ error: "Failed to reorder experiences" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}