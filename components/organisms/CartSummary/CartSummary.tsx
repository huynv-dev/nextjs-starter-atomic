import { CartItem } from '@/components/molecules/CartItem/CartItem'
import styles from './cartSummary.module.css'
import { Button } from '@/components/atoms/Button/Button'

type Item = {
  id: string
  name: string
  price: number
  quantity: number
}

type Props = {
  items: Item[]
  onRemove: (id: string) => void
  onCheckout: () => void
}

export const CartSummary = ({ items, onRemove, onCheckout }: Props) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className={styles.wrapper}>
      <h2>Cart</h2>
      <div className={styles.items}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </div>
      <div className={styles.total}>
        <strong>Total:</strong> ${total.toFixed(2)}
      </div>
      <Button onClick={onCheckout}>Proceed to Checkout</Button>
    </div>
  )
}
