"use client"

import { useEffect, useState, Suspense } from "react"
import { ShopLayout } from "@/components/layouts/shop-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { ThankYouContent } from "@/components/thank-you/thank-you-content"

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
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function ThankYouPage() {
  return (
    <ShopLayout>
      <Suspense fallback={
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <p>Loading order details...</p>
          </div>
        </div>
      }>
        <ThankYouContent />
      </Suspense>
    </ShopLayout>
  )
}
