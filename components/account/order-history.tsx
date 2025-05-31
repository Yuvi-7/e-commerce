"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id?: string;
  id?: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Delivered" | "Processing" | "Shipped" | "Pending" | "Cancelled";
}

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete order")
      }

      // Remove the order from the UI
      setOrders(orders.filter((order) => {
        const orderIdToCompare = order.id || order._id
        return orderIdToCompare !== undefined && orderIdToCompare !== orderId
      }))
      toast.success("Order deleted successfully")
    } catch (error) {
      console.error("Failed to delete order:", error)
      toast.error("Failed to delete order")
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500"
      case "Processing":
        return "bg-blue-500"
      case "Shipped":
        return "bg-yellow-500"
      case "Pending":
        return "bg-orange-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Loading orders...</p>
        </CardContent>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const orderId = order.id || order._id
        if (!orderId) return null
        return (
          <Card key={orderId}>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-lg">Order {orderId}</CardTitle>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{order.items?.length || 0} items</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteOrder(orderId)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
