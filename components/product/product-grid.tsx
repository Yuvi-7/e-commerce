"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { getDummyProducts } from "@/lib/data/products";
import { useSearchParams } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
  categoryId: string;
  description: string;
  features: string[];
  brand?: string;
  rating?: number;
};

export function ProductGrid({ categoryId }: { categoryId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const cart = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get all products
    let filteredProducts = getDummyProducts(categoryId) as Product[];

    // Apply price filter
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Apply category filter
    const selectedCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    // Apply brand filter
    const selectedBrands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand?.toLowerCase() || "")
      );
    }

    // Apply rating filter
    const selectedRatings = searchParams.get("ratings")?.split(",").filter(Boolean) || [];
    if (selectedRatings.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedRatings.some((rating) => Number(rating) <= (product.rating || 0))
      );
    }

    setProducts(filteredProducts);
  }, [categoryId, searchParams]);

  const handleAddToCart = (product: Product) => {
    if (!cart?.addItem) return;

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      categoryId: product.categoryId,
    };

    cart.addItem(itemToAdd);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="w-full py-8">
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                {product.badge && (
                  <Badge className="absolute top-3 right-3 z-10">
                    {product.badge}
                  </Badge>
                )}
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg?height=200&width=200"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </Link>
              </div>
              <CardContent className="p-6">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg hover:underline mb-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-medium text-primary text-lg mb-2">
                  ${product.price.toFixed(2)}
                </p>
                {product.category && (
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                  disabled={!cart?.addItem}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
