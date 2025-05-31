import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
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

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.id) },
      { projection: { password: 0 } } // Exclude password from the response
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
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

    // Remove sensitive fields from updates
    delete updates.password
    delete updates.role
    delete updates._id

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(decoded.id) },
      { $set: updates }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Fetch and return the updated user
    const updatedUser = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.id) },
      { projection: { password: 0 } }
    )

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Failed to update user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
} 