import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  console.log("Upload request received");
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const updateProfile = formData.get("updateProfile") === "true";

    console.log("File info:", {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      updateProfile
    });

    if (!file) {
      console.log("No file in request");
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validasi ukuran file (maksimal 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log(`File too large: ${file.size} bytes`);
      return NextResponse.json(
        { error: "File size too large. Maximum 5MB allowed." },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.log(`Invalid file type: ${file.type}`);
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Buat direktori uploads jika belum ada
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
      console.log("Created uploads directory");
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const filePath = join(uploadsDir, uniqueFilename);
    const publicPath = `/uploads/${uniqueFilename}`;

    // Simpan file ke filesystem
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));
    console.log("File saved to filesystem:", filePath);

    // Test database connection
    console.log("Testing database connection...");
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("Database connection successful");
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Simpan metadata ke database
    console.log("Saving file metadata to database...");
    const savedImage = await prisma.profileImage.create({
      data: {
        filename: file.name,
        mimetype: file.type,
        path: publicPath,
        size: file.size,
      },
    });
    console.log("Image metadata saved successfully:", savedImage.id);

    // Jika updateProfile=true, update field profileImage di model Profile
    if (updateProfile) {
      const profile = await prisma.profile.findFirst();
      if (profile) {
        await prisma.profile.update({
          where: { id: profile.id },
          data: {
            profileImage: publicPath,
          },
        });
        console.log("Profile updated with new image path");
      }
    }

    return NextResponse.json({
      message: "Upload successful",
      path: publicPath,
      id: savedImage.id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
