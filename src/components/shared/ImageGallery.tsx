
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
  const [selectedImage, setSelectedImage] = useState(images && images.length > 0 ? images[0] : 'https://placehold.co/1066x799.png');
  // Ensure effectiveImages always has at least one placeholder if the input is empty
  const effectiveImages = images && images.length > 0 ? images : ['https://placehold.co/1066x799.png'];


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
          {/* Main Image Display */}
          {/* The parent div will define the max available width. 
              We add flex justify-center items-center to center the image if its maxWidth is less than the container.
              A background color helps visualize the letterboxing if any. */}
          <div className="relative w-full flex justify-center items-center bg-muted/20">
            <img
              src={selectedImage}
              alt={`${altTextPrefix} - Main View`}
              className="block" // Ensures display: block
              style={{
                width: '100%', // Takes full width of its parent container
                maxWidth: '1066px', // Crucial: Do not upscale beyond image's typical native width or a reasonable large size.
                                    // If image is 1066px wide, it won't render wider than that.
                                    // If container is <1066px, it will scale down to fit (width: 100%).
                height: 'auto', // Maintains aspect ratio
                // imageRendering: 'pixelated', // Removed this line
              }}
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
