import styles from './cartItem.module.css'
import { Button } from '@/components/atoms/Button/Button'

type Props = {
  name: string
  price: number
  quantity: number
  onRemove: () => void
}

export const CartItem = ({ name, price, quantity, onRemove }: Props) => {
  return (
    <div className={styles.row}>
      <div>
        <p>{name}</p>
        <span>${(price * quantity).toFixed(2)} ({quantity})</span>
      </div>
      <Button variant="secondary" onClick={onRemove}>
        Remove
      </Button>
    </div>
  )
}
