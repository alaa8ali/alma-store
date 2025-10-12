import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Allow access if authenticated
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Check if user has valid token
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Protect all admin routes except login
export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/products/:path*", "/admin/orders/:path*"],
};

