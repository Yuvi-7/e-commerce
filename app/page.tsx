import { ShopLayout } from "@/components/layouts/shop-layout"
import { ProductGrid } from "@/components/product/product-grid"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedSection } from "@/components/sections/featured-section"
import { CategorySection } from "@/components/sections/category-section"
import { Suspense } from "react"

// TODO: Implement analytics tracking for homepage sections
// Added by Yuvraj - 03/24: Main homepage component handling the core shopping experience
// Breaking this into sections helped with code splitting and improved LCP metrics

export default function Home() {
  // Wrapping heavy components with Suspense for better UX
  // Will add error boundaries in the next sprint
  return (
    <ShopLayout>
      {/* Hero section - A/B testing different layouts */}
      <HeroSection />
      
      {/* Categories - considering adding lazy loading here if section grows */}
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategorySection />
      </Suspense>

      {/* Featured items - data fetching optimized for mobile */}
      <Suspense fallback={<div>Loading featured items...</div>}>
        <FeaturedSection />
      </Suspense>

      {/* Main product grid - implemented virtual scrolling for performance */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid />
      </Suspense>
    </ShopLayout>
  )
}
