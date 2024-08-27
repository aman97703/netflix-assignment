// middleware.js
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isVisitingAuthPage = req.nextUrl.pathname.startsWith("/login");

  const isVisitingDashboardPage =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/browse");
    req.nextUrl.pathname.startsWith("/video");
    req.nextUrl.pathname.startsWith("/list");
    req.nextUrl.pathname.startsWith("/movies");
    req.nextUrl.pathname.startsWith("/tvshows");

  // If the user is authenticated and trying to access the sign-in page, redirect them
  if (token && isVisitingAuthPage) {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  // If the user is not authenticated and trying to access a protected page, redirect to login
  if (!token && isVisitingDashboardPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/signin", "/dashboard/:path*"], // Add other protected routes here
};
