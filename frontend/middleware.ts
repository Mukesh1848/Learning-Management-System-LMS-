import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const freeRoutes = ["/auth/login", "/auth/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = freeRoutes.includes(path);

  try {
    const token = req.cookies.get("token")?.value;

    if (!token && isProtectedRoute) {
      console.log("req.nextUrl", req.nextUrl);
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    if (token && isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    const absoluteURL = new URL("/auth/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
