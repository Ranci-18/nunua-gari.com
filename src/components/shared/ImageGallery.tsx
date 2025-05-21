
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
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-0 bg-muted/20"> {/* Moved background to CardContent */}
          {/* Main Image Display - Simplified Structure */}
          <img
            src={selectedImage}
            alt={`${altTextPrefix} - Main View`}
            className="block w-full h-auto mx-auto" // Sizing and positioning classes directly on img
            style={{ 
              maxWidth: '1066px', // Cap at a reasonable max width, e.g., natural width of your example
            }}
            data-ai-hint={selectedImage.includes('placehold.co') ? 'placeholder car detail' : 'car detail'}
          />
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
                quality={75} 
                data-ai-hint={image.includes('placehold.co') ? 'placeholder car thumbnail' : 'car thumbnail'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
