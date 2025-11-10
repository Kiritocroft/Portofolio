import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Cari gambar di database berdasarkan ID (primary method)
    // ID can be database ID or filename from path
    let image = await prisma.profileImage.findUnique({
      where: { id }
    });
    
    // If not found by ID, try to find by filename in path
    if (!image) {
      image = await prisma.profileImage.findFirst({
        where: {
          OR: [
            { path: { contains: id } },
            { filename: id }
          ]
        },
        orderBy: {
          createdAt: 'desc' // Get the most recent if multiple matches
        }
      });
    }
    
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    let fileBuffer: Buffer;
    
    // Check if file data is stored in database (Vercel) or filesystem (local)
    if (image.data) {
      // Vercel: File data is stored in database
      fileBuffer = Buffer.from(image.data);
      console.log("Serving image from database");
    } else {
      // Local: File is stored in filesystem
      const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
      
      if (isVercel) {
        // If we're in Vercel but no data in DB, try /tmp
        const tmpPath = `/tmp/uploads/${id}`;
        if (existsSync(tmpPath)) {
          fileBuffer = await readFile(tmpPath);
        } else {
          return NextResponse.json({ error: 'Image file not found' }, { status: 404 });
        }
      } else {
        // Local development: read from public/uploads
        const filePath = image.path.startsWith('/uploads/')
          ? join(process.cwd(), 'public', image.path)
          : join(process.cwd(), 'public', 'uploads', id);
        
        if (!existsSync(filePath)) {
          return NextResponse.json({ error: 'Image file not found on filesystem' }, { status: 404 });
        }
        
        fileBuffer = await readFile(filePath);
      }
    }
    
    // Buat response dengan data gambar dan tipe konten yang sesuai
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', image.mimetype);
    response.headers.set('Cache-Control', 'public, max-age=31536000'); // Cache selama 1 tahun
    
    return response;
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}