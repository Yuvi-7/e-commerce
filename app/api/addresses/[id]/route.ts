import { connectToDatabase } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import { ObjectId, Collection } from "mongodb"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { db } = await connectToDatabase()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let decoded
    try {
      decoded = verify(token, JWT_SECRET) as { id: string }
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    const addressesCollection = db.collection("addresses") as Collection
    const result = await addressesCollection.deleteOne({
      _id: new ObjectId(params.id),
      userId: decoded.id,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete address:", error)
    return NextResponse.json({ error: "Failed to delete address" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { db } = await connectToDatabase()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let decoded
    try {
      decoded = verify(token, JWT_SECRET) as { id: string }
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const updates = await request.json()

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    const addressesCollection = db.collection("addresses") as Collection
    if (updates.isDefault) {
      await addressesCollection.updateMany(
        { userId: decoded.id },
        { $set: { isDefault: false } }
      )
    }

    const result = await addressesCollection.updateOne(
      { _id: new ObjectId(params.id), userId: decoded.id },
      { $set: updates }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update address:", error)
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
  }
}
