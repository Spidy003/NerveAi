import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_SUPABASE_URL = "https://bwhxqugsvbymphiopqpd.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aHhxdWdzdmJ5bXBoaW9wcXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4ODA1MTIsImV4cCI6MjEwNDQ1NjUxMn0.XXsgmYoh5s54h9SlMfGun7VZTVh0EnmNzjuKMURKj14";

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
            try {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              supabaseResponse = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            } catch (cookieErr) {
              // ignore cookie write issues in edge runtime
            }
          },
        },
      }
    );

    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data?.user;
    } catch (err) {
      // ignore supabase auth fetch errors
    }

    const demoSession = request.cookies.get("nerve_demo_session");
    const isDemo = demoSession?.value === "active";

    if (!user && !isDemo && request.nextUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (globalErr) {
    console.error("Middleware error caught safely:", globalErr);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|glb|gltf|ico|txt|json)$).*)",
  ],
};

