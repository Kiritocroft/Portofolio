import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Cari gambar di database berdasarkan ID
    const image = await prisma.profileImage.findUnique({
      where: { id }
    });
    
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    // Baca file dari filesystem
    const filePath = join(process.cwd(), 'public', image.path);
    const fileBuffer = await readFile(filePath);
    
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