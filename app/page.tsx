import { ShopLayout } from "@/components/layouts/shop-layout"
import { ProductGrid } from "@/components/product/product-grid"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedSection } from "@/components/sections/featured-section"
import { CategorySection } from "@/components/sections/category-section"

export default function Home() {
  return (
    <ShopLayout>
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <ProductGrid />
    </ShopLayout>
  )
}
