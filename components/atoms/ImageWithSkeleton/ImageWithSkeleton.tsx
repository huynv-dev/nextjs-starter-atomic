import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function ImageWithSkeleton({ src, alt, width, height }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && (
        <Skeleton
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            borderRadius: 8,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 8,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s',
          position: 'absolute',
          top: 0, left: 0,
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
        onLoad={() => setLoaded(true)}
      />
    </>
  )
} 