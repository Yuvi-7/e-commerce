"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentOrders() {
  // This would normally come from an API
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-06-15",
      status: "Delivered",
      total: "$125.99",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-06-14",
      status: "Processing",
      total: "$89.50",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-06-14",
      status: "Shipped",
      total: "$254.75",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-06-13",
      status: "Pending",
      total: "$45.25",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-06-12",
      status: "Delivered",
      total: "$189.99",
    },
  ]

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
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
