import { ProductListTemplate } from '@/components/templates/ProductListTemplate/ProductListTemplate'
import { CartTemplate } from '@/components/templates/CartTemplate/CartTemplate'
import { CheckoutTemplate } from '@/components/templates/CheckoutTemplate/CheckoutTemplate'

export default function DemoPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4">🛍 Products</h2>
        <ProductListTemplate />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">🧺 Cart Summary</h2>
        <CartTemplate />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">💳 Checkout</h2>
        <CheckoutTemplate />
      </section>
    </div>
  )
}
