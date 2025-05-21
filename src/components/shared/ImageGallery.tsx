
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
  const [selectedImage, setSelectedImage] = useState(images && images.length > 0 ? images[0] : 'https://placehold.co/1200x900.png');
  const effectiveImages = images && images.length > 0 ? images : ['https://placehold.co/1200x900.png'];


  if (!effectiveImages || effectiveImages.length === 0) {
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
              // Adjust sizes: 100vw for smaller screens.
              // For md screens up to 7xl container (1280px), it takes 2/3 width. 2/3 of 1280 is ~853px.
              // 66vw for viewports between 768px and 1280px.
              // Then a fixed larger size for viewports larger than the container.
              sizes="(max-width: 767px) 100vw, (min-width: 768px) and (max-width: 1279px) 66vw, 850px"
              priority // Main image on a details page can be high priority
              quality={90} // Increased quality slightly
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
                sizes="150px" // Thumbnails are relatively small
                data-ai-hint={image.includes('placehold.co') ? 'placeholder car thumbnail' : 'car thumbnail'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
