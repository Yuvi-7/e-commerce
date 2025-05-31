"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TopProducts() {
  // This would normally come from an API
  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      sales: 245,
      revenue: "₹48,756.25",
    },
    {
      id: "2",
      name: "Smart Fitness Tracker",
      category: "Electronics",
      sales: 187,
      revenue: "₹16,823.13",
    },
    {
      id: "3",
      name: "Ultra HD Smart TV",
      category: "Electronics",
      sales: 124,
      revenue: "₹86,744.76",
    },
    {
      id: "4",
      name: "Wireless Charging Pad",
      category: "Electronics",
      sales: 196,
      revenue: "₹7,839.02",
    },
    {
      id: "5",
      name: "Bluetooth Portable Speaker",
      category: "Electronics",
      sales: 76,
      revenue: "₹3,039.24",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell className="text-right">{product.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
