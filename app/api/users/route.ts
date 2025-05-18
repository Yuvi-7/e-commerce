import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const users = await db.collection("users").find({}).project({ password: 0 }).toArray()

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const userData = await request.json()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: userData.email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(userData.password, 10)

    const user = {
      ...userData,
      password: hashedPassword,
      role: userData.role || "customer",
      createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(user)

    // Don't return the password
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({ id: result.insertedId, ...userWithoutPassword }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
