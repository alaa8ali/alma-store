import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get user info
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if user is admin
    if (user?.email === "alaa4mange1@gmail.com") {
      return NextResponse.redirect(new URL("/admin/dashboard", requestUrl.origin));
    } else {
      // Not authorized, sign out
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/admin/login?error=unauthorized", requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL("/admin/login", requestUrl.origin));
}

