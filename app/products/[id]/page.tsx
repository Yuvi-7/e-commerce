import { ShopLayout } from "@/components/layouts/shop-layout"
import { ProductDetails } from "@/components/product/product-details"
import { getProductById } from "@/lib/api/products"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <ShopLayout>
      <ProductDetails product={product} />
    </ShopLayout>
  )
}
