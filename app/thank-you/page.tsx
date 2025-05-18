import { ShopLayout } from "@/components/layouts/shop-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`

  // Get current date in a readable format
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <ShopLayout>
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-lg mb-8">
            Your order has been received and is being processed. You will receive a confirmation email shortly.
          </p>
          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="font-semibold mb-2">Order #{orderNumber}</h2>
            <p className="text-sm text-muted-foreground mb-4">{orderDate}</p>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>$245.98</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>$24.60</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total:</span>
              <span>$280.58</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account/orders">View Your Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
