"use client"

import { useEffect, useState } from "react"
import { ShopLayout } from "@/components/layouts/shop-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch order")
        }
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error("Failed to fetch order:", error)
        toast.error("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    } else {
      setLoading(false)
    }
  }, [orderId])

  if (loading) {
    return (
      <ShopLayout>
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <p>Loading order details...</p>
          </div>
        </div>
      </ShopLayout>
    )
  }

  if (!order) {
    return (
      <ShopLayout>
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-lg mb-8">We couldn't find the order details.</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </ShopLayout>
    )
  }

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
            <h2 className="font-semibold mb-2">Order #{order.id || order._id}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {new Date(order.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
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
