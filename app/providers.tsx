"use client"

import type React from "react"

import { CartProvider } from "@/hooks/use-cart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {children}
        <Toaster position="top-right" />
      </CartProvider>
    </QueryClientProvider>
  )
}
