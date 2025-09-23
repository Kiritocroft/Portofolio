import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const updateProfile = formData.get("updateProfile") === "true";

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Baca file dan simpan ke database saja (tanpa filesystem lokal)
    const bytes = await file.arrayBuffer();
    
    const savedImage = await prisma.profileImage.create({
      data: {
        filename: file.name,
        mimetype: file.type,
        data: new Uint8Array(bytes),
      },
    });

    // Jika updateProfile=true, update field profileImage di model Profile
    if (updateProfile) {
      const profile = await prisma.profile.findFirst();
      if (profile) {
        await prisma.profile.update({
          where: { id: profile.id },
          data: {
            // Simpan URL API yang melayani gambar dari DB
            profileImage: `/api/images/${savedImage.id}`,
          },
        });
      }
    }

    return NextResponse.json({
      message: "Upload successful",
      path: `/api/images/${savedImage.id}`,
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