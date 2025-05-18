"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { getDummyProducts } from "@/lib/data/products";

export function ProductGrid({ categoryId }: { categoryId?: string }) {
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Get dummy products, optionally filtered by category
    const dummyProducts = getDummyProducts(categoryId);
    setProducts(dummyProducts);
  }, [categoryId]);

  const handleAddToCart = (product) => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      categoryId: product.categoryId,
    };

    addItem(itemToAdd);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              {product.badge && (
                <Badge className="absolute top-2 right-2 z-10">
                  {product.badge}
                </Badge>
              )}
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-[200px] w-full object-cover transition-transform hover:scale-105"
                />
              </Link>
            </div>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg hover:underline">
                  {product.name}
                </h3>
              </Link>
              <p className="font-medium text-primary">
                ${product.price.toFixed(2)}
              </p>
              {product.category && (
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
