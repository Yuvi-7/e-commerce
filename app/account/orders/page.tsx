import { ShopLayout } from "@/components/layouts/shop-layout"
import { OrderHistory } from "@/components/account/order-history"

export default function OrdersPage() {
  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <OrderHistory />
      </div>
    </ShopLayout>
  )
}
