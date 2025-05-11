"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

export function OrderHistory() {
  // Dummy order data
  const [orders] = useState([
    {
      id: "ORD-12345",
      date: "May 10, 2025",
      status: "Delivered",
      total: "$125.99",
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "April 28, 2025",
      status: "Shipped",
      total: "$89.50",
      items: 2,
    },
    {
      id: "ORD-12343",
      date: "April 15, 2025",
      status: "Delivered",
      total: "$254.75",
      items: 4,
    },
    {
      id: "ORD-12342",
      date: "March 22, 2025",
      status: "Delivered",
      total: "$45.25",
      items: 1,
    },
  ])

  const getStatusColor = (status) => {
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

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-lg">Order {order.id}</CardTitle>
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
                <p className="text-sm text-muted-foreground mb-1">{order.items} items</p>
                <p className="font-medium">{order.total}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/account/orders/${order.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Order
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
