import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      role: "customer",
      createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(user)

    // Create user object without password
    const userWithoutPassword = {
      id: result.insertedId.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // Create JWT token
    const token = sign({ id: result.insertedId.toString(), email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    })

    // Set cookie
    ;(await
      // Set cookie
      cookies()).set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    })

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
