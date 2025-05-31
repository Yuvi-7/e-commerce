import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    // Get token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

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
      return NextResponse.json([])
    }

    const addresses = await db.collection("addresses").find({ userId: decoded.id }).toArray()
    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Failed to fetch addresses:", error)
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    // Get token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

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

    const address = await request.json()

    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    const result = await db.collection("addresses").insertOne({
      ...address,
      userId: decoded.id,
      createdAt: new Date(),
    })

    return NextResponse.json({ id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Failed to create address:", error)
    return NextResponse.json({ error: "Failed to create address" }, { status: 500 })
  }
} 