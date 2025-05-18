import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("auth-token")?.value

  // Check if the path requires authentication
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin")
  const isAccountPath = request.nextUrl.pathname.startsWith("/account")
  const isCheckoutPath = request.nextUrl.pathname.startsWith("/checkout")

  // If path requires authentication but no token, redirect to login
  if ((isAdminPath || isAccountPath || isCheckoutPath) && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If admin path, verify user is admin
  if (isAdminPath && token) {
    try {
      const decoded = verify(token, JWT_SECRET) as { role: string }
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
}
