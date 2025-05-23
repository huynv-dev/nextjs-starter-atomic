'use client'

import { useCartStore } from '@/stores/cartStore'
import { CheckoutForm } from '@/components/organisms/CheckoutForm/CheckoutForm'

export const CheckoutTemplate = () => {
  const clearCart = useCartStore((s) => s.clearCart)

  const handleSubmit = (data: { name: string; email: string; address: string }) => {
    console.log('Order submitted:', data)
    alert('Thank you for your order!')
    clearCart()
  }

  return <CheckoutForm onSubmit={handleSubmit} />
}
