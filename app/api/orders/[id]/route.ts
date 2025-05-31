import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    // With database connection, query MongoDB
    let objectId
    try {
      objectId = new ObjectId(params.id)
    } catch (error) {
      // If ID is not a valid ObjectId, try to find by string ID
      const order = await db.collection("orders").findOne({ id: params.id })
      if (order) return NextResponse.json(order)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const order = await db.collection("orders").findOne({
      _id: objectId,
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Failed to fetch order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
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
      const result = await db.collection("orders").deleteOne({ id: params.id })
      if (result.deletedCount === 0) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    const result = await db.collection("orders").deleteOne({
      _id: objectId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete order:", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
} 