import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function CategorySection() {
  // This would normally come from an API
  const categories = [
    {
      id: "1",
      name: "Electronics",
      image: "/placeholder.svg?height=150&width=150",
      count: 120,
    },
    {
      id: "2",
      name: "Clothing",
      image: "/placeholder.svg?height=150&width=150",
      count: 84,
    },
    {
      id: "3",
      name: "Home & Kitchen",
      image: "/placeholder.svg?height=150&width=150",
      count: 97,
    },
    {
      id: "4",
      name: "Sports & Outdoors",
      image: "/placeholder.svg?height=150&width=150",
      count: 65,
    },
  ]

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Browse our wide selection of products by category
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="h-[150px] w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm">{category.count} Products</p>
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
