import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_REFRESH = "refreshToken";
const protectedRoutes = ["/profile"];
const guestOnlyRoutes = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const refreshToken =
    req.cookies.get(COOKIE_REFRESH)?.value;

  const hasSession = Boolean(refreshToken);

  if (
    protectedRoutes.some((r) => pathname.startsWith(r)) &&
    !hasSession
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (
    guestOnlyRoutes.some((r) => pathname.startsWith(r)) &&
    hasSession
  ) {
    return NextResponse.redirect(
      new URL("/profile", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/register"],
};
