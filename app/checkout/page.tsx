import { ShopLayout } from "@/components/layouts/shop-layout"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"

export default function CheckoutPage() {
  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
