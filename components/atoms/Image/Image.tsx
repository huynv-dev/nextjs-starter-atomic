'use client';
import { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';

interface ImageProps extends Omit<NextImageProps, 'placeholder'> {
  withBlur?: boolean;
  loadingType?: 'shimmer' | 'pulse' | 'skeleton';
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

const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMj4xLy4vLi4+QT5APj49QT42Pi4uRkFBQVlZWUJBQkFBQUFBQUH/2wBDAR0XFyAeIBokHiA6KT4pOkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

export const Image = ({ 
  withBlur = false, 
  loadingType = 'shimmer',
  ...props 
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Chỉ sử dụng placeholder blur cho ảnh lớn hơn 40x40
  const shouldUseBlur = withBlur && (props.width as number) >= 40 && (props.height as number) >= 40;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const getLoadingEffect = () => {
    const width = props.width as number;
    const height = props.height as number;

    switch (loadingType) {
      case 'pulse':
        return (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        );
      
      case 'skeleton':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        );
      
      case 'shimmer':
      default:
        return (
          <div
            className="absolute inset-0 bg-gray-200 rounded-md overflow-hidden"
            style={{
              backgroundImage: `url(data:image/svg+xml;base64,${toBase64(shimmer(width, height))})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        );
    }
  };

  if (hasError) {
    return (
      <div
        className={clsx(
          'bg-gray-100 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300',
          props.className
        )}
        style={{ width: props.width, height: props.height }}
      >
        <div className="text-center">
          <svg 
            className="mx-auto h-8 w-8 text-gray-400 mb-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-xs text-gray-500">Failed to load</span>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('relative overflow-hidden')}>
      <NextImage
        {...props}
        className={clsx(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          props.className
        )}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={shouldUseBlur ? 'blur' : undefined}
        blurDataURL={shouldUseBlur ? defaultBlurDataURL : undefined}
      />
      
      {isLoading && getLoadingEffect()}
    </div>
  );
};


