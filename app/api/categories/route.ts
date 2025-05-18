import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { getDummyCategories } from "@/lib/data/categories"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return NextResponse.json(getDummyCategories())
    }

    // With database connection, query MongoDB
    const categories = await db.collection("categories").find({}).toArray()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    // Fall back to dummy data on error
    return NextResponse.json(getDummyCategories())
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const category = await request.json()

    if (!db) {
      // If no database connection, return success with dummy ID
      return NextResponse.json({ id: "dummy-id" }, { status: 201 })
    }

    // With database connection, insert into MongoDB
    const result = await db.collection("categories").insertOne(category)

    return NextResponse.json({ id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Failed to create category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
