import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
// import { getDummyCategories } from "@/lib/data/categories";
import { getCategories } from "@/lib/api/categories";

// Import category images
import electronicsImg from "@/public/images/categories/electronics.jpg";
import clothingImg from "@/public/images/categories/clothing.jpg";
import homeKitchenImg from "@/public/images/categories/home-kitchen.jpg";
import sportsImg from "@/public/images/categories/sports.jpg";
import furnitureImg from "@/public/images/categories/furniture.jpg";
import beautyImg from "@/public/images/categories/beauty.jpg";
import booksImg from "@/public/images/categories/books.jpg";
import toysImg from "@/public/images/categories/toys.jpg";

// Map category IDs to their respective images
const categoryImages = {
  "1": electronicsImg,
  "2": clothingImg,
  "3": homeKitchenImg,
  "4": sportsImg,
  "5": furnitureImg,
  "6": beautyImg,
  "7": booksImg,
  "8": toysImg,
};

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
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={categoryImages[category.id] || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm">
                      {category.count === 0
                        ? "No products yet"
                        : `${category.count} ${category.count === 1 ? "Product" : "Products"}`}
                    </p>
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
