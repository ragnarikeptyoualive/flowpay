'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface GalleryAutoSliderProps {
  images: GalleryImage[];
}

export default function GalleryAutoSlider({ images }: GalleryAutoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto transition - FASTER SLIDING
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = isMobile ? 2000 : 4000; // Mobile: 2s → Desktop: 4s

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, isMobile, isPaused]);

  const currentImage = images[currentIndex];

  return (
    <>
      <div 
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-[9/16] md:aspect-[16/9] w-full overflow-hidden">
          <NextImage
            key={currentIndex} // Force re-render for smooth transition
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover transition-all duration-700"
            sizes="100vw"
            priority
          />

          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'bg-sky-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X size={36} />
          </button>

          <div
            className="relative max-w-[95vw] max-h-[95vh] aspect-[9/16] md:aspect-auto rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NextImage
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}