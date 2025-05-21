
'use client';

import Image from 'next/image'; // Used for thumbnails
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images && images.length > 0 ? images[0] : 'https://placehold.co/1066x799.png');
  const effectiveImages = images && images.length > 0 ? images : ['https://placehold.co/1066x799.png'];


  if (!effectiveImages || effectiveImages.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="w-full bg-muted flex items-center justify-center" style={{aspectRatio: '4/3'}}> {/* Default aspect ratio for placeholder */}
            <p className="text-muted-foreground">No images available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-0">
          {/* Main Image Display */}
          <div className="relative w-full bg-muted/20">
            <img
              src={selectedImage}
              alt={`${altTextPrefix} - Main View`}
              className="block" // Ensures it behaves like a block element
              style={{
                width: '100%',        // Image will try to take full width of its parent div
                maxWidth: '1066px',   // But will not exceed 1066px (or a suitable max for your design)
                height: 'auto',       // Maintains aspect ratio
                margin: '0 auto',     // Centers the image horizontally if maxWidth makes it narrower than its parent div
              }}
              data-ai-hint={selectedImage.includes('placehold.co') ? 'placeholder car detail' : 'car detail'}
            />
          </div>
        </CardContent>
      </Card>
      {effectiveImages.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {effectiveImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "aspect-square relative w-full overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selectedImage === image ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${altTextPrefix} - Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                sizes="150px"
                quality={75} // Thumbnails can be lower quality
                data-ai-hint={image.includes('placehold.co') ? 'placeholder car thumbnail' : 'car thumbnail'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
