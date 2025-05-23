import { Button } from '@/components/atoms/Button/Button'
import styles from './productCard.module.css'

type Props = {
  id: string
  name: string
  image: string
  price: number
  onAddToCart: (id: string) => void
}

export const ProductCard = ({ id, name, image, price, onAddToCart }: Props) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <Button onClick={() => onAddToCart(id)}>Add to Cart</Button>
      </div>
    </div>
  )
}
