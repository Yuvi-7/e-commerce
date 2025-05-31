"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Search } from "lucide-react"

export function OrdersTable() {
  // This would normally come from an API using TanStack Query
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "Alice Johnson",
      email: "alice.johnson@example.com",
      date: "2023-06-15",
      status: "Delivered",
      total: "$125.99",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2023-06-14",
      status: "Processing",
      total: "$89.50",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      email: "robert.johnson@example.com",
      date: "2023-06-14",
      status: "Shipped",
      total: "$254.75",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      email: "emily.davis@example.com",
      date: "2023-06-13",
      status: "Pending",
      total: "$45.25",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      email: "michael.wilson@example.com",
      date: "2023-06-12",
      status: "Delivered",
      total: "$189.99",
    },
    {
      id: "ORD-006",
      customer: "Sarah Brown",
      email: "sarah.brown@example.com",
      date: "2023-06-11",
      status: "Cancelled",
      total: "$67.50",
    },
    {
      id: "ORD-007",
      customer: "David Miller",
      email: "david.miller@example.com",
      date: "2023-06-10",
      status: "Delivered",
      total: "$124.00",
    },
    {
      id: "ORD-008",
      customer: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      date: "2023-06-09",
      status: "Refunded",
      total: "$99.99",
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
      case "Refunded":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
