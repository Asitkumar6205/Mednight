import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req }); // Check if user is authenticated

  // Protect all routes inside /admin/*
  if (req.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/access-denied", req.url)); // Redirect if not authenticated
  }

  return NextResponse.next(); // Continue if authenticated
}

// Apply middleware to `/admin/*`
export const config = {
  matcher: ["/admin/:path*"], // ✅ Protects `/admin/*`
};
