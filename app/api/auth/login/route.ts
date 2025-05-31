import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { compare } from "bcrypt"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import { WithId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await db.collection("users").findOne({ email }) as WithId<User>
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create user object without password
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // Create JWT token
    const token = sign({ id: user._id.toString(), email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    })

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
