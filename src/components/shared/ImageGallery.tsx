
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
          <div className="w-full bg-muted flex items-center justify-center aspect-[4/3]">
            <p className="text-muted-foreground">No images available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {/* Main Image Display */}
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-0 bg-muted/20"> {/* Ensure no padding */}
          <img
            src={selectedImage}
            alt={`${altTextPrefix} - Main View`}
            className="block mx-auto" // display: block and margin: auto for centering
            style={{
              width: 'auto',          // Let the image use its natural width
              maxWidth: '100%',       // But don't let it overflow its container
              height: 'auto',         // Maintain aspect ratio
              maxHeight: '75vh',      // Prevent image from being excessively tall (adjust as needed)
            }}
            data-ai-hint={selectedImage.includes('placehold.co') ? 'placeholder car detail' : 'car detail'}
          />
        </CardContent>
      </Card>

      {/* Thumbnail Grid */}
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
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover"
                quality={75}
                priority={index < 3} 
                data-ai-hint={image.includes('placehold.co') ? 'placeholder car thumbnail' : 'car thumbnail'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

    