"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export function CartItems() {
  const cart = useCart()

  if (!cart) {
    return null
  }

  const { items, removeItem, updateItemQuantity } = cart

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-lg font-medium">Your cart is empty</h3>
        <p className="text-muted-foreground mt-1">Add some products to your cart to see them here.</p>
        <Button className="mt-4" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 py-4 border-b">
          <div className="w-24 h-24 rounded-md overflow-hidden relative">
            <img
              src={item.image || "/placeholder.svg?height=100&width=100"}
              alt={item.name}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Link href={`/products/${item.id}`} className="hover:underline">
              <h3 className="font-medium">{item.name}</h3>
            </Link>
            {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
            {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
            <p className="text-sm text-muted-foreground">
              Price: ₹{item.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (item.quantity > 1) {
                    updateItemQuantity(item.id, item.quantity - 1)
                  }
                }}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-auto"
                onClick={() => {
                  removeItem(item.id)
                  toast.success(`${item.name} removed from cart`)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
