'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import clsx from 'clsx';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill';
  quality?: number;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const Image = ({
  src,
  alt,
  width = 300,
  height = 200,
  className,
  priority = false,
  objectFit = 'cover',
  quality = 75
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={clsx(
          'bg-gray-200 flex items-center justify-center',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          'transition-opacity duration-300 ease-in-out',
          isLoading ? 'opacity-0' : 'opacity-100',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'fill' && 'object-fill'
        )}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
        onLoadingComplete={handleLoad}
        onError={handleError}
      />
      
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ 
            backgroundImage: `url(data:image/svg+xml;base64,${toBase64(shimmer(width, height))})` 
          }}
        />
      )}
    </div>
  );
}; 