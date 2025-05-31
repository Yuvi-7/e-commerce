"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

export function FeaturedSection() {
  const { addItem } = useCart()

  // This would normally come from an API
  const featuredProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "/images/products/wireless-headphones.jpg",
      badge: "New",
      category: "Electronics",
      categoryId: "1",
    },
    {
      id: "2",
      name: "Smart Fitness Tracker",
      price: 89.99,
      image: "/images/products/fitness-tracker.jpg",
      badge: "Sale",
      category: "Electronics",
      categoryId: "1",
    },
    {
      id: "3",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "/images/products/office-chair.jpg",
      category: "Furniture",
      categoryId: "5",
    },
    {
      id: "4",
      name: "Ultra HD Smart TV",
      price: 699.99,
      image: "/images/products/smart-tv.jpg",
      badge: "Popular",
      category: "Electronics",
      categoryId: "1",
    },
  ]

  const handleAddToCart = (product) => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      categoryId: product.categoryId,
    }

    addItem(itemToAdd)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Check out our most popular items handpicked for you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg group">
              <div className="relative aspect-square">
                {product.badge && <Badge className="absolute top-3 right-3 z-10">{product.badge}</Badge>}
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>
              <CardContent className="p-6">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg group-hover:underline mb-2">{product.name}</h3>
                </Link>
                <p className="font-medium text-primary text-lg">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" size="lg" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <Link href="/products">
            <Button variant="outline" size="lg" className="px-8 text-lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
