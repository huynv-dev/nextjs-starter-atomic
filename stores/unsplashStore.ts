import { create } from 'zustand'

export type UnsplashPhoto = {
  id: string
  src: string
  alt_description: string | null
  width: number
  height: number
}

interface UnsplashState {
  photos: UnsplashPhoto[]
  loading: boolean
  error: string | null
  fetchRandomPhotos: (count?: number) => Promise<void>
}

export const useUnsplashStore = create<UnsplashState>((set) => ({
  photos: [],
  loading: false,
  error: null,
  fetchRandomPhotos: async (count = 10) => {
    set({ loading: true, error: null })
    try {
      const page = Math.floor(Math.random() * 1000) + 1 // random page for variety
      const res = await fetch(`/api/mock-gallery?page=${page}&limit=${count}`)
      if (!res.ok) throw new Error('Failed to fetch photos')
      const data = await res.json()
      set((state) => ({
        photos: [...state.photos, ...data],
        loading: false,
      }))
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },
})) 