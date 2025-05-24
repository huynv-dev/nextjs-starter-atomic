import Image from 'next/image'

interface ImageWithBlurProps {
  src: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

export default function ImageWithBlur({
  src, alt, width, height, blurDataURL
}: ImageWithBlurProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlZWUiLz48L3N2Zz4='}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8,
        position: 'absolute',
        top: 0, left: 0,
      }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      unoptimized
    />
  )
} 