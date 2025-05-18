import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { getDummyProducts } from "@/lib/data/products"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return NextResponse.json(getDummyProducts())
    }

    // With database connection, query MongoDB
    const products = await db.collection("products").find({}).toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Failed to fetch products:", error)
    // Fall back to dummy data on error
    return NextResponse.json(getDummyProducts())
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const product = await request.json()

    if (!db) {
      // If no database connection, return success with dummy ID
      return NextResponse.json({ id: "dummy-id" }, { status: 201 })
    }

    // With database connection, insert into MongoDB
    const result = await db.collection("products").insertOne(product)

    return NextResponse.json({ id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Failed to create product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
