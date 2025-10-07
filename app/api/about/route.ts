import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const about = await prisma.about.findFirst({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(about ?? { content: "Welcome to my portfolio. You can edit this text in the admin panel." });
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const existing = await prisma.about.findFirst();
    const saved = existing
      ? await prisma.about.update({ where: { id: existing.id }, data: { content } })
      : await prisma.about.create({ data: { content } });

    return NextResponse.json(saved);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
