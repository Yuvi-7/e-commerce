import { ShopLayout } from "@/components/layouts/shop-layout"
import { CategoryGrid } from "@/components/category/category-grid"

export default function CategoriesPage() {
  return ( 
    <ShopLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
        <CategoryGrid />
      </div>
    </ShopLayout>
  )
}
