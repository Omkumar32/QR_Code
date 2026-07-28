import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_feedback_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const isLoggedIn = sessionCookie && sessionCookie.length > 10;

  // Already on login page
  if (pathname === "/admin/login") {
    // If logged in, redirect to dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    // Otherwise allow through
    return NextResponse.next();
  }

  // Protect all other /admin/* routes
  if (!isLoggedIn) {
    const loginUrl = new URL("/admin/login", request.url);
    // Pass current path so we can redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
