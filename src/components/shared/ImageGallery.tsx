
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const mainPlaceholder = 'https://placehold.co/1066x799.png?text=Image+Not+Available';
  const thumbPlaceholder = 'https://placehold.co/200x150.png?text=Thumb';

  const effectiveImages = images && images.length > 0 ? images : [mainPlaceholder];
  
  // Initialize with the first image or placeholder
  const [selectedImageForDisplay, setSelectedImageForDisplay] = useState<string>(effectiveImages[0]);
  
  // This state will hold the src for the main Image component. It can be an actual image URL or a placeholder.
  const [mainImageSrc, setMainImageSrc] = useState<string>(effectiveImages[0]);

  // Update mainImageSrc when selectedImageForDisplay changes (e.g., by clicking a thumbnail)
  // or when the initial images prop changes.
  useEffect(() => {
    if (images && images.length > 0) {
      // If selectedImageForDisplay is still part of the current images list, use it.
      // Otherwise, default to the first image from the new list.
      const newSelection = images.includes(selectedImageForDisplay) ? selectedImageForDisplay : images[0];
      setMainImageSrc(newSelection);
      setSelectedImageForDisplay(newSelection); // Keep selectedImageForDisplay in sync
    } else {
      // No images provided, use placeholder
      setMainImageSrc(mainPlaceholder);
      setSelectedImageForDisplay(mainPlaceholder);
    }
  }, [images]); // Rerun if the images prop itself changes

  const handleThumbnailClick = (image: string) => {
    setSelectedImageForDisplay(image);
    setMainImageSrc(image); // Update src for the main image
  };

  const handleMainImageError = () => {
    // If the main image (even a selected one) fails to load, fall back to the main placeholder.
    setMainImageSrc(mainPlaceholder);
  };
  
  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If a thumbnail fails, replace its src with a generic thumbnail placeholder
    if (e.currentTarget.src !== thumbPlaceholder) {
        e.currentTarget.src = thumbPlaceholder;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Main Image Display */}
      <div className="relative w-full bg-muted/10 rounded-lg overflow-hidden shadow-md">
        <Image
          key={mainImageSrc} // Use key to force re-render on src change, especially for placeholder fallback
          src={mainImageSrc}
          alt={`${altTextPrefix} - Main View`}
          width={1066} // Provide natural width for aspect ratio
          height={799} // Provide natural height for aspect ratio
          quality={95}
          priority
          className="w-full h-auto object-cover max-h-[75vh] rounded-lg" // Changed to object-cover
          sizes="(max-width: 768px) 100vw, 66vw" // Helps Next.js choose optimal image size
          data-ai-hint={mainImageSrc.includes('placehold.co') ? 'placeholder car detail' : 'car detail large'}
          onError={handleMainImageError}
        />
      </div>

      {/* Thumbnail Grid */}
      {images && images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(image)}
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selectedImageForDisplay === image ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${altTextPrefix} - Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover" // Thumbnails generally look good with cover
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                className="object-cover rounded-sm"
                quality={75}
                priority={index < 3}
                data-ai-hint={'car thumbnail small'}
                onError={handleThumbnailError}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
