import { UnsplashPhoto } from '@/types/unsplash'
import ImageWithSkeleton from '@/components/atoms/ImageWithSkeleton/ImageWithSkeleton'

interface PhotoCardProps {
  photo: UnsplashPhoto
  onClick?: () => void
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div
      className="gallery-item cursor-pointer"
      style={{ position: 'relative', width: '100%' }}
      onClick={onClick}
    >
      <div
        style={{
          width: '100%',
          paddingTop: `${(photo.height / photo.width) * 100}%`,
          position: 'relative',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#eee',
        }}
      >
        <ImageWithSkeleton
          src={photo.src}
          alt={photo.alt_description || `Unsplash ${photo.id}`}
          width={photo.width}
          height={photo.height}
        />
      </div>
    </div>
  )
} 