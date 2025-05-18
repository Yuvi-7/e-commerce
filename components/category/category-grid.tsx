import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
// import { getDummyCategories } from "@/lib/data/categories";
import { getCategories } from "@/lib/api/categories";

export async function CategoryGrid() {
  const categories = await getCategories();

  // const categories = getDummyCategories();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories?.map((category) => (
        <Link
          href={`/categories/${category.id}`}
          key={category.id}
          className="group"
        >
          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={
                    category.image || "/placeholder.svg?height=200&width=200"
                  }
                  alt={category.name}
                  width={300}
                  height={300}
                  className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
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
  );
}
