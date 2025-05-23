import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'

test('renders product name and price', () => {
  render(
    <ProductCard
      id="1"
      name="Shirt"
      image="/shirt.jpg"
      price={19.99}
      onAddToCart={() => {}}
    />
  )
  expect(screen.getByText('Shirt')).toBeInTheDocument()
  expect(screen.getByText('$19.99')).toBeInTheDocument()
})
