import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Set max duration for this route (30 seconds for large file uploads)
export const maxDuration = 30;

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

    // Validasi ukuran file (maksimal 4MB untuk Vercel compatibility)
    // Vercel has 4.5MB body size limit for serverless functions
    const maxSize = 4 * 1024 * 1024; // 4MB (safety margin for Vercel's 4.5MB limit)
    if (file.size > maxSize) {
      console.log(`File too large: ${file.size} bytes`);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { error: `File size too large (${fileSizeMB}MB). Maximum 4MB allowed. The image should be compressed automatically, but if this error persists, please use a smaller file.` },
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

    // Determine storage method based on environment
    // In Vercel/serverless: store in database as binary (filesystem is read-only)
    // In local development: store in public/uploads directory
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    
    // Get file buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    
    let publicPath: string;
    let fileData: Buffer | null = null;

    if (isVercel) {
      // Vercel: Store file data in database
      // Filesystem is read-only in Vercel, so we store the file as binary in database
      fileData = fileBuffer;
      // We'll use database ID in the path after saving
      publicPath = `/api/images/placeholder`; // Placeholder, will use ID after save
      console.log("Vercel environment: Will store file in database");
    } else {
      // Local development: Store file in filesystem
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      
      try {
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
          console.log("Created uploads directory:", uploadsDir);
        }
      } catch (dirError: any) {
        console.error("Error creating directory:", dirError);
        return NextResponse.json(
          { error: "Failed to create upload directory. Please check server configuration." },
          { status: 500 }
        );
      }
      
      const filePath = join(uploadsDir, uniqueFilename);
      await writeFile(filePath, fileBuffer);
      publicPath = `/uploads/${uniqueFilename}`;
      console.log("Local environment: File saved to filesystem:", filePath);
    }

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

    // Simpan metadata dan data ke database
    console.log("Saving file to database...");
    const savedImage = await prisma.profileImage.create({
      data: {
        filename: file.name,
        mimetype: file.type,
        path: isVercel ? `/api/images/${uniqueFilename}` : publicPath, // Use filename for Vercel, full path for local
        size: file.size,
        data: fileData, // Store file data if in Vercel, null if local
      },
    });
    
    // Update publicPath to use database ID for Vercel
    if (isVercel) {
      publicPath = `/api/images/${savedImage.id}`;
      // Update the path in database to use ID
      await prisma.profileImage.update({
        where: { id: savedImage.id },
        data: { path: publicPath },
      });
    }
    
    console.log("Image saved successfully:", savedImage.id);

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
      filename: uniqueFilename, // Also return filename for API route access
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    const errorMessage = error?.message || error?.toString() || "Failed to upload file";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
