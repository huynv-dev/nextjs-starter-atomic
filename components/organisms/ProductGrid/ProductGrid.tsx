import { ProductCard } from '@/components/molecules/ProductCard/ProductCard'
import styles from './productGrid.module.css'

type Product = {
  id: string
  name: string
  image: string
  price: number
}

type Props = {
  products: Product[]
  onAddToCart: (id: string) => void
}

export const ProductGrid = ({ products, onAddToCart }: Props) => {
  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          image={p.image}
          price={p.price}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
