
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images && images.length > 0 ? images[0] : 'https://placehold.co/800x600.png');
  const effectiveImages = images && images.length > 0 ? images : ['https://placehold.co/800x600.png'];


  if (!effectiveImages || effectiveImages.length === 0) {
    // This case should ideally not be hit if we provide a default above, but as a fallback:
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-video relative w-full bg-muted flex items-center justify-center">
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
          <div className="aspect-video relative w-full">
            <Image
              src={selectedImage}
              alt={`${altTextPrefix} - Main View`}
              layout="fill"
              objectFit="contain" 
              className="transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              priority // Main image on a details page can be high priority
              quality={85} // Slightly increase quality if blurriness is an issue, default is 75
              data-ai-hint={selectedImage.includes('placehold.co') ? 'placeholder car detail' : 'car detail'}
            />
          </div>
        </CardContent>
      </Card>
      {effectiveImages.length > 1 && ( // Only show thumbnails if there's more than one image
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
                sizes="100px" // Provide a hint for thumbnail sizes
                data-ai-hint={image.includes('placehold.co') ? 'placeholder car thumbnail' : 'car thumbnail'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
