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
    const { title, location, description, date, icon } = await request.json();
    const exp = await prisma.experience.update({ 
      where: { id }, 
      data: { title, location, description, date, icon: icon || "CgWorkAlt" } 
    });
    return NextResponse.json(exp);
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
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
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}