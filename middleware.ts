import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req }); // Check if user is authenticated

  // List of protected routes
  const protectedRoutes = ["/admin"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/access-denied", req.url)); // Redirect if not authenticated
  }

  return NextResponse.next(); // Continue if authenticated
}

export const config = {
  matcher: ["/admin"], // Apply middleware to `/admin`
};
