import { ProductCard } from './ProductCard'

export default {
  title: 'Molecules/ProductCard',
  component: ProductCard,
}

export const Default = () => (
  <ProductCard
    id="1"
    name="Basic T-Shirt"
    image="https://via.placeholder.com/300"
    price={19.99}
    onAddToCart={(id) => alert(`Add product ${id}`)}
  />
)
