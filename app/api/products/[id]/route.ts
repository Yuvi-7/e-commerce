import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDummyProductById } from "@/lib/data/products"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      const product = getDummyProductById(params.id)
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    // With database connection, query MongoDB
    let objectId
    try {
      objectId = new ObjectId(params.id)
    } catch (error) {
      // If ID is not a valid ObjectId, try to find by string ID
      const product = await db.collection("products").findOne({ id: params.id })
      if (product) return NextResponse.json(product)

      // If not found, try dummy data
      const dummyProduct = getDummyProductById(params.id)
      if (dummyProduct) return NextResponse.json(dummyProduct)

      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const product = await db.collection("products").findOne({
      _id: objectId,
    })

    if (!product) {
      // If not found in database, try dummy data
      const dummyProduct = getDummyProductById(params.id)
      if (dummyProduct) return NextResponse.json(dummyProduct)

      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Failed to fetch product:", error)

    // Fall back to dummy data on error
    const dummyProduct = getDummyProductById(params.id)
    if (dummyProduct) return NextResponse.json(dummyProduct)

    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const updates = await request.json()

    if (!db) {
      // If no database connection, return success with dummy data
      return NextResponse.json({ success: true })
    }

    // With database connection, update in MongoDB
    let objectId
    try {
      objectId = new ObjectId(params.id)
    } catch (error) {
      // If ID is not a valid ObjectId, try to update by string ID
      const result = await db.collection("products").updateOne({ id: params.id }, { $set: updates })
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    const result = await db.collection("products").updateOne({ _id: objectId }, { $set: updates })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return success with dummy data
      return NextResponse.json({ success: true })
    }

    // With database connection, delete from MongoDB
    let objectId
    try {
      objectId = new ObjectId(params.id)
    } catch (error) {
      // If ID is not a valid ObjectId, try to delete by string ID
      const result = await db.collection("products").deleteOne({ id: params.id })
      if (result.deletedCount === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    const result = await db.collection("products").deleteOne({
      _id: objectId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
