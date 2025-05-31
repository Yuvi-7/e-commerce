import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-muted">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Our Latest Collection
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Shop the latest trends and find your perfect style. Quality products at affordable prices.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/products">
                <Button size="lg" className="px-8">Shop Now</Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="px-8">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Modern Indian Shopping Experience"
              className="mx-auto aspect-square overflow-hidden rounded-2xl object-cover shadow-lg sm:w-full lg:order-last"
              height="600"
              src="/images/about/hero-shopping.jpg"
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
