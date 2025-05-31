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
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"

type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock"

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export function ProductsTable() {
  // This would normally come from an API using TanStack Query
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 199.99,
      stock: 45,
      status: "In Stock",
    },
    {
      id: "2",
      name: "Smart Fitness Tracker",
      category: "Electronics",
      price: 89.99,
      stock: 32,
      status: "In Stock",
    },
    {
      id: "3",
      name: "Ergonomic Office Chair",
      category: "Furniture",
      price: 249.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "4",
      name: "Ultra HD Smart TV",
      category: "Electronics",
      price: 699.99,
      stock: 12,
      status: "In Stock",
    },
    {
      id: "5",
      name: "Stainless Steel Water Bottle",
      category: "Kitchen",
      price: 24.99,
      stock: 78,
      status: "In Stock",
    },
    {
      id: "6",
      name: "Wireless Charging Pad",
      category: "Electronics",
      price: 39.99,
      stock: 54,
      status: "In Stock",
    },
    {
      id: "7",
      name: "Bluetooth Portable Speaker",
      category: "Electronics",
      price: 79.99,
      stock: 23,
      status: "In Stock",
    },
    {
      id: "8",
      name: "Digital Drawing Tablet",
      category: "Electronics",
      price: 149.99,
      stock: 5,
      status: "Low Stock",
    },
  ])

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
    toast.success("Product deleted successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      product.status === "In Stock"
                        ? "bg-green-500"
                        : product.status === "Low Stock"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
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
