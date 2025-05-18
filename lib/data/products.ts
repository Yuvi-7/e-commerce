// Dummy product data
const dummyProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    badge: "New",
    category: "Electronics",
    categoryId: "1",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Touch controls",
      "Foldable design",
    ],
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Sale",
    category: "Electronics",
    categoryId: "1",
    description:
      "Track your fitness goals with our smart fitness tracker. Monitor your heart rate, steps, sleep, and more with this waterproof and stylish device.",
    features: [
      "Heart rate monitoring",
      "Step counter",
      "Sleep tracking",
      "Waterproof design",
      "7-day battery life",
      "Smartphone notifications",
    ],
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 249.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Furniture",
    categoryId: "5",
    description:
      "Stay comfortable during long work hours with our ergonomic office chair. Featuring adjustable height, lumbar support, and breathable mesh back.",
    features: [
      "Adjustable height",
      "Lumbar support",
      "Breathable mesh back",
      "360-degree swivel",
      "Durable construction",
      "Easy assembly",
    ],
  },
  {
    id: "4",
    name: "Ultra HD Smart TV",
    price: 699.99,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Popular",
    category: "Electronics",
    categoryId: "1",
    description:
      "Enjoy stunning visuals with our Ultra HD Smart TV. Featuring 4K resolution, HDR support, and built-in streaming apps for endless entertainment.",
    features: [
      "4K Ultra HD resolution",
      "HDR support",
      "Built-in streaming apps",
      "Voice control",
      "Multiple HDMI ports",
      "Slim design",
    ],
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Kitchen",
    categoryId: "3",
    description:
      "Stay hydrated with our stainless steel water bottle. Double-wall insulation keeps drinks cold for 24 hours or hot for 12 hours.",
    features: [
      "Double-wall insulation",
      "BPA-free",
      "Leak-proof lid",
      "Durable stainless steel",
      "Easy-carry handle",
      "Fits standard cup holders",
    ],
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
    badge: "New",
    category: "Electronics",
    categoryId: "1",
    description:
      "Charge your devices wirelessly with our sleek charging pad. Compatible with all Qi-enabled smartphones and earbuds.",
    features: [
      "Qi wireless charging",
      "Fast charging support",
      "LED indicator",
      "Slim design",
      "Non-slip surface",
      "Overcharge protection",
    ],
  },
  {
    id: "7",
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    categoryId: "1",
    description:
      "Take your music anywhere with our portable Bluetooth speaker. Featuring 360-degree sound, waterproof design, and 12-hour battery life.",
    features: [
      "360-degree sound",
      "Waterproof (IPX7)",
      "12-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Compact design",
    ],
  },
  {
    id: "8",
    name: "Digital Drawing Tablet",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Limited",
    category: "Electronics",
    categoryId: "1",
    description:
      "Create digital art with precision using our drawing tablet. Featuring pressure sensitivity, customizable shortcut keys, and compatibility with all major design software.",
    features: [
      "8192 pressure levels",
      "Customizable shortcut keys",
      "Battery-free stylus",
      "Large drawing area",
      "Tilt support",
      "Compatible with Windows and macOS",
    ],
  },
  {
    id: "9",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Clothing",
    categoryId: "2",
    description:
      "Stay comfortable with our premium cotton t-shirt. Made from 100% organic cotton for breathability and durability.",
    features: [
      "100% organic cotton",
      "Breathable fabric",
      "Reinforced stitching",
      "Pre-shrunk",
      "Available in multiple colors",
      "Sizes XS to XXL",
    ],
  },
  {
    id: "10",
    name: "Smart Home Security Camera",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    categoryId: "1",
    description:
      "Keep your home secure with our smart security camera. Featuring HD video, night vision, motion detection, and two-way audio.",
    features: [
      "1080p HD video",
      "Night vision",
      "Motion detection alerts",
      "Two-way audio",
      "Cloud storage option",
      "Weather-resistant",
    ],
  },
  {
    id: "11",
    name: "Non-Stick Cookware Set",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Sale",
    category: "Kitchen",
    categoryId: "3",
    description:
      "Upgrade your kitchen with our non-stick cookware set. Includes pots and pans with durable non-stick coating and heat-resistant handles.",
    features: [
      "Durable non-stick coating",
      "Heat-resistant handles",
      "Dishwasher safe",
      "Oven safe up to 450°F",
      "Even heat distribution",
      "Includes 10 pieces",
    ],
  },
  {
    id: "12",
    name: "Yoga Mat",
    price: 34.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Sports & Outdoors",
    categoryId: "4",
    description:
      "Perfect your yoga practice with our premium yoga mat. Features non-slip surface, eco-friendly materials, and proper cushioning for joints.",
    features: [
      "Non-slip surface",
      "Eco-friendly TPE material",
      "6mm thickness for joint protection",
      "Lightweight and portable",
      "Includes carrying strap",
      "Easy to clean",
    ],
  },
]

export function getDummyProducts(categoryId?: string) {
  if (categoryId) {
    return dummyProducts.filter((product) => product.categoryId === categoryId)
  }
  return dummyProducts
}

export function getDummyProductById(id: string) {
  return dummyProducts.find((product) => product.id === id)
}

export async function getProductById(id: string) {
  // This function would normally fetch from MongoDB
  // For now, return dummy data
  return getDummyProductById(id)
}

export async function getProducts() {
  // This function would normally fetch from MongoDB
  // For now, return dummy data
  return dummyProducts
}
