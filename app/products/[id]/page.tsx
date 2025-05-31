import { ShopLayout } from "@/components/layouts/shop-layout"
import { ProductDetails } from "@/components/product/product-details"
import { getProductById } from "@/lib/api/products"
import { notFound } from "next/navigation"
import { WithId } from "mongodb"

interface DatabaseProduct {
  _id: string;
  name: string;
  price: number;
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
}

interface DummyProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
  categoryId: string;
  description: string;
  features: string[];
}

type Product = WithId<DatabaseProduct> | DummyProduct

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rawProduct = await getProductById(id) as Product

  if (!rawProduct) {
    notFound()
  }

  // Transform the product into the expected format
  const product = {
    id: '_id' in rawProduct ? rawProduct._id.toString() : rawProduct.id,
    name: rawProduct.name,
    price: rawProduct.price,
    description: rawProduct.description,
    images: '_id' in rawProduct ? rawProduct.images : [rawProduct.image],
    colors: '_id' in rawProduct ? rawProduct.colors : undefined,
    sizes: '_id' in rawProduct ? rawProduct.sizes : undefined,
    features: '_id' in rawProduct ? rawProduct.features : rawProduct.features,
    specifications: '_id' in rawProduct ? rawProduct.specifications : undefined,
    reviews: '_id' in rawProduct ? rawProduct.reviews : undefined,
    category: rawProduct.category,
    categoryId: rawProduct.categoryId,
  }

  return (
    <ShopLayout>
      <ProductDetails product={product} />
    </ShopLayout>
  )
}
