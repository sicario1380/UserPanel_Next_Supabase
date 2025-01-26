import { getUser } from "@/queries/user";
import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const encodedRedirectTo = requestUrl.searchParams.get("redirect") || "/app"; // Default to /app dashboard route
  const redirectTo = decodeURIComponent(encodedRedirectTo);

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    const userData = await getUser();
    // You can add any additional user setup here, e.g., create user avatar
  }

  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
}
