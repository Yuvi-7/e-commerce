"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { Heart, Share2, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const { addItem } = useCart()
  const router = useRouter()

  // Ensure product has all required fields
  const productDetails = {
    id: product.id,
    name: product.name || "Product Name",
    price: product.price || 0,
    description: product.description || "No description available",
    images: product.images || [product.image || "/placeholder.svg?height=500&width=500"],
    colors: product.colors || ["Black", "Silver", "Blue"],
    sizes: product.sizes || ["One Size"],
    features: product.features || ["Feature 1", "Feature 2", "Feature 3"],
    specifications: product.specifications || {
      Brand: "Brand Name",
      Model: "Model Number",
      Weight: "0.5kg",
      Warranty: "1 year",
    },
    reviews: product.reviews || [
      {
        id: "1",
        user: "Customer",
        rating: 5,
        date: "2023-05-15",
        comment: "Great product!",
      },
    ],
    category: product.category,
    categoryId: product.categoryId,
  }

  const handleAddToCart = () => {
    const itemToAdd = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      quantity: quantity,
      image: productDetails.images[0],
      size: selectedSize || productDetails.sizes[0],
      color: selectedColor || productDetails.colors[0],
      category: productDetails.category,
      categoryId: productDetails.categoryId,
    }

    addItem(itemToAdd)
    toast.success(`${productDetails.name} added to cart`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src={productDetails.images[0] || "/placeholder.svg"}
              alt={productDetails.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productDetails.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg border cursor-pointer">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${productDetails.name} ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{productDetails.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.0 (24 reviews)</span>
            </div>
            <p className="text-2xl font-bold mt-4">${productDetails.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{productDetails.description}</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Color</label>
              <div className="flex gap-2 mt-2">
                {productDetails.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className="rounded-md"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {productDetails.sizes.length > 0 && (
              <div>
                <label className="text-sm font-medium">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full mt-2">
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

            <div>
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-2 mt-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="secondary" size="lg" onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="mt-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="p-4 border rounded-md mt-4">
          <ul className="list-disc pl-5 space-y-2">
            {productDetails.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="p-4 border rounded-md mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(productDetails.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 border rounded-md mt-4">
          <div className="space-y-6">
            {productDetails.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{review.user}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
