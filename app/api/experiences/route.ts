import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
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

    const { title, location, description, date, icon } = await request.json();
    if (!title || !location || !description || !date) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const exp = await prisma.experience.create({ 
      data: { 
        title, 
        location, 
        description, 
        date, 
        icon: icon || "CgWorkAlt" 
      } 
    });
    return NextResponse.json(exp, { status: 201 });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}