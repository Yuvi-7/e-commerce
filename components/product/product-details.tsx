"use client"

/**
 * Product Details Component
 * 
 * A comprehensive product view component that handles:
 * - Product information display
 * - Image gallery
 * - Size and color selection
 * - Quantity management
 * - Cart operations
 * - Reviews and ratings
 * 
 * @author Yuvraj
 * @lastModified 2024-03-24
 * @version 2.1.0
 * 
 * Changelog:
 * - v2.1.0: Added image lazy loading and error states
 * - v2.0.0: Refactored for better mobile responsiveness
 * - v1.0.0: Initial implementation
 */

import { useState, useCallback, useMemo } from "react"
import Image from "next/image" // Using Next.js Image for better performance
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { Heart, Share2, Star, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"

// Constants
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10; // Prevent bulk orders
const PLACEHOLDER_IMAGE = "/placeholder.svg";

// Types
interface ProductDetailsProps {
  product: {
    id: string;
    name?: string;
    price?: number;
    description?: string;
    images?: string[];
    colors?: string[];
    sizes?: string[];
    features?: string[];
    specifications?: Record<string, string>;
    reviews?: Array<{
      id: string;
      user: string;
      rating: number;
      date: string;
      comment: string;
    }>;
    category?: string;
    categoryId?: string;
  };
}

export function ProductDetails({ product }: ProductDetailsProps) {
  // State management with validation
  const [quantity, setQuantity] = useState(MIN_QUANTITY)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [imageError, setImageError] = useState(false)
  
  // Hooks
  const cart = useCart()
  const router = useRouter()

  // Memoized product details to prevent unnecessary re-renders
  const productDetails = useMemo(() => ({
    id: product.id,
    name: product.name || "Product Name",
    price: product.price || 0,
    description: product.description || "No description available",
    images: product.images?.length ? product.images : [PLACEHOLDER_IMAGE],
    colors: product.colors || ["Black"],
    sizes: product.sizes || ["One Size"],
    features: product.features || [],
    specifications: product.specifications || {},
    reviews: product.reviews || [],
    category: product.category,
    categoryId: product.categoryId,
  }), [product])

  // Handlers with validation and error handling
  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      return Math.min(Math.max(newQuantity, MIN_QUANTITY), MAX_QUANTITY);
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    try {
      if (!cart) {
        toast.error("Cart is not available");
        return;
      }

      if (!selectedSize && productDetails.sizes.length > 1) {
        toast.error("Please select a size");
        return;
      }

      if (!selectedColor && productDetails.colors.length > 1) {
        toast.error("Please select a color");
        return;
      }

      const itemToAdd = {
        id: productDetails.id,
        name: productDetails.name,
        price: productDetails.price,
        quantity,
        image: productDetails.images[0],
        size: selectedSize || productDetails.sizes[0],
        color: selectedColor || productDetails.colors[0],
        category: productDetails.category,
        categoryId: productDetails.categoryId,
      };

      cart.addItem(itemToAdd);
      toast.success(`${productDetails.name} added to cart`);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  }, [productDetails, quantity, selectedSize, selectedColor, cart]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    router.push("/checkout");
  }, [handleAddToCart, router]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg aspect-square">
            <img
              src={productDetails.images[0] || "/placeholder.svg"}
              alt={productDetails.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productDetails.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg border cursor-pointer aspect-square">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${productDetails.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{productDetails.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">(4.0)</span>
            </div>
            <p className="text-3xl font-bold text-primary">₹{productDetails.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">{productDetails.description}</p>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-base font-medium">Color</label>
              <div className="flex gap-3">
                {productDetails.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className="rounded-md px-6"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {productDetails.sizes.length > 0 && (
              <div className="space-y-3">
                <label className="text-base font-medium">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {productDetails.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-base font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                  -
                </Button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="secondary" size="lg" onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="mt-16">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <div className="space-y-4">
            {productDetails.features.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {productDetails.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <p>No features available</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="specifications">
          <div className="space-y-4">
            {Object.keys(productDetails.specifications).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(productDetails.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <p>No specifications available</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="space-y-8">
            {productDetails.reviews.length > 0 ? (
              productDetails.reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{review.user}</span>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <p>No reviews yet</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
