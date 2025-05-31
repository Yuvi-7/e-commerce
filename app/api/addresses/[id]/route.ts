import { connectToDatabase } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

type Props = {
  params: {
    id: string
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { db } = await connectToDatabase()
    
    // Get token from cookies
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify token and get user ID
    let decoded
    try {
      decoded = verify(token, JWT_SECRET) as { id: string }
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    const result = await db.collection("addresses").deleteOne({
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    
    // Get token from cookies
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify token and get user ID
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

    // If setting as default, unset default for all other addresses first
    if (updates.isDefault) {
      await db.collection("addresses").updateMany(
        { userId: decoded.id },
        { $set: { isDefault: false } }
      )
    }

    const result = await db.collection("addresses").updateOne(
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