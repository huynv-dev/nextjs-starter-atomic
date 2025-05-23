'use client'


import { CartSummary } from '@/components/organisms/CartSummary/CartSummary'
import { useCartStore } from '@/stores/cartStore'

export const CartTemplate = () => {
  const items = useCartStore((s) => s.items)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const clearCart = useCartStore((s) => s.clearCart)

  const handleCheckout = () => {
    alert('Proceeding to checkout...')
  }

  return (
    <CartSummary
      items={items}
      onRemove={removeFromCart}
      onCheckout={handleCheckout}
    />
  )
}
