import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if accessing admin pages
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login") && !req.nextUrl.pathname.startsWith("/admin/auth")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Check if user is admin
    if (session.user.email !== "alaa4mange1@gmail.com") {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/admin/login?error=unauthorized", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};

