import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Test basic database connection
    console.log("Testing database connection...");
    // For MongoDB, we'll just try to count users as a connection test
    const userCount = await prisma.user.count();
    console.log("Database connection successful");

    // Test if User table exists and has data
    console.log(`User count: ${userCount}`);

    // Test if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL || "admin@gmail.com" }
    });
    console.log(`Admin user exists: ${!!adminUser}`);

    // Test other tables
    const skillCount = await prisma.skill.count();
    const expCount = await prisma.experience.count();
    const aboutCount = await prisma.about.count();

    return NextResponse.json({
      status: "success",
      database: {
        connected: true,
        userCount,
        adminUserExists: !!adminUser,
        skillCount,
        experienceCount: expCount,
        aboutCount
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? "SET" : "NOT SET",
        adminEmail: process.env.ADMIN_EMAIL || "NOT SET",
        adminPassword: process.env.ADMIN_PASSWORD ? "SET" : "NOT SET"
      }
    });
  } catch (error) {
    console.error("Database debug error:", error);
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? "SET" : "NOT SET",
        adminEmail: process.env.ADMIN_EMAIL || "NOT SET",
        adminPassword: process.env.ADMIN_PASSWORD ? "SET" : "NOT SET"
      }
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}