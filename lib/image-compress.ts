/**
 * Utility function to compress images on the client side
 * Uses Canvas API to resize and compress images
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  maxSizeMB?: number; // Target maximum size in MB
}

/**
 * Compress an image file
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Compressed image as Blob
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<Blob> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.8,
    maxSizeMB = 2,
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Try different quality levels to meet size requirement
        const tryCompress = (currentQuality: number): void => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              const sizeMB = blob.size / (1024 * 1024);

              // If size is acceptable or quality is too low, return the blob
              if (sizeMB <= maxSizeMB || currentQuality <= 0.3) {
                resolve(blob);
              } else {
                // Try with lower quality
                tryCompress(currentQuality - 0.1);
              }
            },
            file.type === 'image/png' ? 'image/png' : 'image/jpeg',
            currentQuality
          );
        };

        tryCompress(quality);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      if (typeof e.target?.result === 'string') {
        img.src = e.target.result;
      } else if (e.target?.result instanceof ArrayBuffer) {
        const blob = new Blob([e.target.result], { type: file.type });
        img.src = URL.createObjectURL(blob);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Check if image needs compression
 * @param file - The image file to check
 * @param maxSizeMB - Maximum size in MB before compression is needed
 * @returns True if compression is needed
 */
export function needsCompression(file: File, maxSizeMB: number = 1): boolean {
  const sizeMB = file.size / (1024 * 1024);
  return sizeMB > maxSizeMB;
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

