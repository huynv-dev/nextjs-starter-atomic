"use client"
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { useUnsplashStore } from '@/stores/unsplashStore'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { UnsplashPhoto } from '@/types/unsplash'
import PhotoCard from '@/components/molecules/PhotoCard/PhotoCard'

const PAGE_SIZE = 10
const WINDOW_SIZE = 200

function GalleryPreview({ images, index, open, onClose }: { images: UnsplashPhoto[], index: number, open: boolean, onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative max-w-full max-h-full w-[90vw] h-[90vh] flex flex-col items-center justify-center">
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl">×</button>
        <img
          src={images[index].src}
          alt={images[index].alt_description || ''}
          style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12 }}
        />
        <div className="text-white mt-2 text-center text-base max-w-full break-words">
          {images[index].alt_description}
        </div>
      </div>
    </div>
  )
}

export default function PhotoGrid() {
  const { photos, loading, fetchRandomPhotos } = useUnsplashStore()
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)

  // Chỉ giữ 200 ảnh gần nhất
  const allImages = useMemo(() => {
    if (!photos) return []
    if (photos.length > WINDOW_SIZE) {
      return photos.slice(photos.length - WINDOW_SIZE)
    }
    return photos
  }, [photos])

  // Fetch initial
  useEffect(() => {
    if (photos.length === 0) fetchRandomPhotos(PAGE_SIZE)
    // eslint-disable-next-line
  }, [])

  // Infinite scroll
  const onScroll = useCallback(() => {
    if (loading) return
    if (!loaderRef.current) return
    const rect = loaderRef.current.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      fetchRandomPhotos(PAGE_SIZE)
    }
  }, [loading, fetchRandomPhotos])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  if (!photos || photos.length === 0) {
    return (
      <div className="masonry-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} height={i % 2 === 0 ? 320 : 240} />
        ))}
      </div>
    )
  }

  return (
    <div className="gallery-container">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1200: 4 }}>
        <Masonry gutter="8px">
          {allImages.map((photo: UnsplashPhoto, idx: number) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => {
                setPreviewIndex(idx)
                setPreviewOpen(true)
              }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={loaderRef} style={{ height: 40 }} />
      {loading && (
        <div className="flex justify-center gap-2 px-4">
          <Skeleton height={200} width={200} />
          <Skeleton height={200} width={200} />
        </div>
      )}
      <GalleryPreview
        images={allImages}
        index={previewIndex}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  )
} 