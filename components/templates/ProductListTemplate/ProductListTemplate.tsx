'use client'

import { ProductGrid } from '@/components/organisms/ProductGrid/ProductGrid'
import { useCartStore } from '@/stores/cartStore'

const dummyProducts = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    image: 'https://via.placeholder.com/300x300',
    price: 19.99,
  },
  {
    id: '2',
    name: 'Stylish Hoodie',
    image: 'https://via.placeholder.com/300x300',
    price: 39.99,
  },
  {
    id: '3',
    name: 'Classic Cap',
    image: 'https://via.placeholder.com/300x300',
    price: 9.99,
  },
]

export const ProductListTemplate = () => {
  const addToCart = useCartStore((s) => s.addToCart)

  return (
    <ProductGrid
      products={dummyProducts}
      onAddToCart={(id) => {
        const found = dummyProducts.find((p) => p.id === id)
        if (found) {
          addToCart({ ...found, quantity: 1 })
        }
      }}
    />
  )
}
