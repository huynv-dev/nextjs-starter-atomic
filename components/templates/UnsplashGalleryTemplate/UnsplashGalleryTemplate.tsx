import PhotoGrid from '@/components/organisms/PhotoGrid/PhotoGrid'

interface UnsplashGalleryTemplateProps {
  title?: string
}

export default function UnsplashGalleryTemplate({ title = 'Unsplash Random Gallery' }: UnsplashGalleryTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <PhotoGrid />
    </div>
  )
} 