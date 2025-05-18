// Dummy category data
const dummyCategories = [
  {
    id: "1",
    name: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    count: 120,
  },
  {
    id: "2",
    name: "Clothing",
    image: "/placeholder.svg?height=200&width=200",
    count: 84,
  },
  {
    id: "3",
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=200&width=200",
    count: 97,
  },
  {
    id: "4",
    name: "Sports & Outdoors",
    image: "/placeholder.svg?height=200&width=200",
    count: 65,
  },
  {
    id: "5",
    name: "Furniture",
    image: "/placeholder.svg?height=200&width=200",
    count: 42,
  },
  {
    id: "6",
    name: "Beauty & Personal Care",
    image: "/placeholder.svg?height=200&width=200",
    count: 73,
  },
  {
    id: "7",
    name: "Books",
    image: "/placeholder.svg?height=200&width=200",
    count: 156,
  },
  {
    id: "8",
    name: "Toys & Games",
    image: "/placeholder.svg?height=200&width=200",
    count: 89,
  },
]

export function getDummyCategories() {
  return dummyCategories
}

export function getCategoryById(id: string) {
  return dummyCategories.find((category) => category.id === id)
}
