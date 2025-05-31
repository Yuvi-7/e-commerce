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
import { Eye, MoreHorizontal, Search } from "lucide-react"

export function CustomersTable() {
  // This would normally come from an API using TanStack Query
  const [customers] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      orders: 5,
      spent: "₹45,625",
      created: "2023-01-15",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      orders: 3,
      spent: "₹21,999",
      created: "2023-02-20",
    },
    {
      id: "3",
      name: "Amit Patel",
      email: "amit.patel@gmail.com",
      orders: 8,
      spent: "₹92,475",
      created: "2022-11-05",
    },
    {
      id: "4",
      name: "Deepa Verma",
      email: "deepa.verma@gmail.com",
      orders: 2,
      spent: "₹10,525",
      created: "2023-03-10",
    },
    {
      id: "5",
      name: "Suresh Reddy",
      email: "suresh.reddy@gmail.com",
      orders: 6,
      spent: "₹58,950",
      created: "2022-09-18",
    },
    {
      id: "6",
      name: "Meera Singh",
      email: "meera.singh@gmail.com",
      orders: 4,
      spent: "₹27,780",
      created: "2023-04-02",
    },
    {
      id: "7",
      name: "Rahul Gupta",
      email: "rahul.gupta@gmail.com",
      orders: 7,
      spent: "₹68,430",
      created: "2022-08-25",
    },
    {
      id: "8",
      name: "Anita Desai",
      email: "anita.desai@gmail.com",
      orders: 1,
      spent: "₹7,999",
      created: "2023-05-12",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-8" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.spent}</TableCell>
                <TableCell>{customer.created}</TableCell>
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
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                      <DropdownMenuItem>Send Email</DropdownMenuItem>
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
