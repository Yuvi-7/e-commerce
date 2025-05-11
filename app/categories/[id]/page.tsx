import { ShopLayout } from "@/components/layouts/shop-layout"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { getCategoryById } from "@/lib/data/categories"
import { notFound } from "next/navigation"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <ProductFilters />
          </div>
          <div className="md:col-span-3">
            <ProductGrid categoryId={params.id} />
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
