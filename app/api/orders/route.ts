import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

// Dummy orders data
const dummyOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-06-15",
    status: "Delivered",
    total: "$125.99",
    items: [
      { id: "1", name: "Premium Wireless Headphones", price: 199.99, quantity: 1 },
      { id: "5", name: "Stainless Steel Water Bottle", price: 24.99, quantity: 1 },
    ],
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-06-14",
    status: "Processing",
    total: "$89.50",
    items: [{ id: "2", name: "Smart Fitness Tracker", price: 89.99, quantity: 1 }],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return NextResponse.json(dummyOrders)
    }

    // With database connection, query MongoDB
    const orders = await db.collection("orders").find({}).toArray()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    // Fall back to dummy data on error
    return NextResponse.json(dummyOrders)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const order = await request.json()

    // Add timestamp
    order.createdAt = new Date()

    if (!db) {
      // If no database connection, return success with dummy ID
      return NextResponse.json({ id: "dummy-order-id" }, { status: 201 })
    }

    // With database connection, insert into MongoDB
    const result = await db.collection("orders").insertOne(order)

    return NextResponse.json({ id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Failed to create order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
