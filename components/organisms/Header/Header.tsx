import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-blue-600">Demo Unsplash Gallery</Link>
        <nav className="flex gap-4">
          <Link href="/unsplash" className="text-gray-700 hover:text-blue-600 font-medium">Unsplash Gallery</Link>
        </nav>
      </div>
    </header>
  )
} 