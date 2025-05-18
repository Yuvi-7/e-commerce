import { ShopLayout } from "@/components/layouts/shop-layout"
import { CartItems } from "@/components/cart/cart-items"
import { CartSummary } from "@/components/cart/cart-summary"

export default function CartPage() {
  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
