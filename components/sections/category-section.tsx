import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function CategorySection() {
  // This would normally come from an API
  const categories = [
    {
      id: "1",
      name: "Electronics",
      image: "/images/categories/electronics.jpg",
      count: 120,
    },
    {
      id: "2",
      name: "Clothing",
      image: "/images/categories/clothing.jpg",
      count: 84,
    },
    {
      id: "3",
      name: "Home & Kitchen",
      image: "/images/categories/home-kitchen.jpg",
      count: 97,
    },
    {
      id: "4",
      name: "Sports & Outdoors",
      image: "/images/categories/sports.jpg",
      count: 65,
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Browse our wide selection of products by category
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity group-hover:bg-black/60">
                      <div className="text-center text-white p-6">
                        <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
                        <p className="text-base text-white/90">{category.count} Products</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
