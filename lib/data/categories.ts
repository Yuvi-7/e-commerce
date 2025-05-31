// Dummy category data
const dummyCategories = [
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
  {
    id: "5",
    name: "Furniture",
    image: "/images/categories/furniture.jpg",
    count: 42,
  },
  {
    id: "6",
    name: "Beauty & Personal Care",
    image: "/images/categories/beauty.jpg",
    count: 73,
  },
  {
    id: "7",
    name: "Books",
    image: "/images/categories/books.jpg",
    count: 156,
  },
  {
    id: "8",
    name: "Toys & Games",
    image: "/images/categories/toys.jpg",
    count: 89,
  },
]

export function getDummyCategories() {
  return dummyCategories
}

export function getCategoryById(id: string) {
  return dummyCategories.find((category) => category.id === id)
}
