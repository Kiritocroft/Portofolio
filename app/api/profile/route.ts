import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst({
      orderBy: { updatedAt: 'desc' }
    });
    
    if (!profile) {
      return NextResponse.json({
        name: "Muhammad Nabil Athaillah",
        title: "Full-Stack Developer",
        description: "Passionate about creating beautiful and functional web applications with modern technologies.",
        location: "Indonesia",
        status: "Welcome To My Portfolio",
        education: "Computer Science at University (2024)",
        experience: "2+ years",
        profileImage: "/pp.jpg",
        backgroundGradient: "from-blue-600 via-purple-600 to-indigo-600"
      });
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();

    const {
      name = "",
      title = "",
      description = ""
    } = data;
    
    const profileData = {
      name,
      title,
      description,
      location: "Indonesia",  // Provide default values for required fields
      education: "Computer Science at University (2024)",
      experience: "2+ years",
      profileImage: "/pp.jpg",
      backgroundGradient: "from-blue-600 via-purple-600 to-indigo-600",
      status: "Welcome To My Portfolio"
    };
    
    const existingProfile = await prisma.profile.findFirst();
    
    let profile;
    if (existingProfile) {
      profile = await prisma.profile.update({
        where: { id: existingProfile.id },
        data: profileData
      });
    } else {
      profile = await prisma.profile.create({
        data: profileData
      });
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}