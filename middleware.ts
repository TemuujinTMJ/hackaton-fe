import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't need authentication
  const isPublicPath = path === "/login" || path.startsWith("/auth");

  // Check for token in cookies (since localStorage is not available in middleware)
  const token = request.cookies.get("sessionToken")?.value;

  // Redirect logic
  if (!isPublicPath && !token) {
    // If accessing protected route without token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && token) {
    // If accessing login page with token, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
