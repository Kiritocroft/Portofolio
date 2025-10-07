import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { name } = await request.json();
    const skill = await prisma.skill.update({ 
      where: { id }, 
      data: { name } 
    });
    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}