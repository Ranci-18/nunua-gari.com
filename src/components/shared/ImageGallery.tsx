
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const mainPlaceholder = 'https://placehold.co/1066x799.png?text=No+Image+Available';
  const thumbPlaceholder = 'https://placehold.co/200x150.png?text=Thumb';

  const effectiveImages = images && images.length > 0 ? images : [mainPlaceholder];
  const [selectedImageForDisplay, setSelectedImageForDisplay] = useState(effectiveImages[0]);
  
  // State for the src of the main image to handle errors
  const [mainImageSrc, setMainImageSrc] = useState(selectedImageForDisplay);

  useEffect(() => {
    const currentSelected = images && images.length > 0 && images.includes(selectedImageForDisplay) 
                            ? selectedImageForDisplay 
                            : (images && images.length > 0 ? images[0] : mainPlaceholder);
    setSelectedImageForDisplay(currentSelected);
    setMainImageSrc(currentSelected);
  }, [images, selectedImageForDisplay]); // Re-evaluate if images or selectedImageForDisplay changes

  const handleMainImageError = () => {
    setMainImageSrc(mainPlaceholder + '&text=Error+Loading');
  };

  // For thumbnails, we'll let next/image show its default broken state or rely on alt text,
  // as managing individual error states for many thumbs is more complex.
  // Alternatively, one could map to an array of objects with src and error state.

  return (
    <div className="grid gap-6">
      {/* Main Image Display */}
      <div className="relative w-full bg-muted/10 rounded-lg overflow-hidden shadow-md max-h-[75vh] flex justify-center items-center">
        <Image
          key={mainImageSrc} // Key helps React re-render if src changes significantly (e.g. to placeholder)
          src={mainImageSrc}
          alt={`${altTextPrefix} - Main View`}
          width={1066} 
          height={799} 
          className="w-full h-auto object-contain max-h-[75vh]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 850px"
          quality={95}
          priority
          data-ai-hint={mainImageSrc.includes('placehold.co') ? 'placeholder car detail' : 'car detail large'}
          onError={handleMainImageError}
        />
      </div>

      {/* Thumbnail Grid */}
      {images && images.length > 1 && ( // Only show thumbnails if there's more than one distinct image
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImageForDisplay(image);
                setMainImageSrc(image); // Reset main image src to the new selection
              }}
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selectedImageForDisplay === image ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image} // Use original image URL here
                alt={`${altTextPrefix} - Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                className="object-cover"
                quality={75}
                priority={index < 3}
                data-ai-hint={'car thumbnail small'}
                // Individual onError for thumbnails can be added if needed,
                // but might be too much if all URLs are bad.
                // For simplicity, we're focusing error handling on the main image.
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
