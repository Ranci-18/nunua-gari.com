
'use client';

import Image from 'next/image'; // Now used for both main and thumbnails
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const effectiveImages = images && images.length > 0 ? images : ['https://placehold.co/1066x799.png?text=Placeholder'];
  const [selectedImage, setSelectedImage] = useState(effectiveImages[0]);

  if (!effectiveImages || effectiveImages.length === 0) {
    // This case should ideally not be reached due to effectiveImages defaulting
    return (
      <div className="w-full bg-muted flex items-center justify-center aspect-video rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {/* Main Image Display */}
      <div className="relative w-full bg-muted/10 rounded-lg overflow-hidden shadow-md">
        {/* 
          Using 1066x799 as base dimensions for aspect ratio. 
          The className 'w-full h-auto' makes it responsive.
          'object-contain' ensures the entire image is visible.
        */}
        <Image
          key={selectedImage} // Add key to force re-render on image change if necessary
          src={selectedImage}
          alt={`${altTextPrefix} - Main View`}
          width={1066} // Intrinsic width of your example image for aspect ratio hint
          height={799} // Intrinsic height of your example image for aspect ratio hint
          className="w-full h-auto object-contain max-h-[75vh]" // Responsive, maintain aspect, limit max height
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 850px"
          quality={95}
          priority
          data-ai-hint={selectedImage.includes('placehold.co') ? 'placeholder car detail' : 'car detail large'}
        />
      </div>

      {/* Thumbnail Grid */}
      {effectiveImages.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {effectiveImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selectedImage === image ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${altTextPrefix} - Thumbnail ${index + 1}`}
                fill // fill is okay for thumbnails if aspect ratios are consistent or cropping is acceptable
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                className="object-cover" // Cover is good for thumbnails
                quality={75} // Lower quality for thumbnails is fine
                priority={index < 3} 
                data-ai-hint={image.includes('placehold.co') ? 'placeholder car thumbnail' : 'car thumbnail small'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
