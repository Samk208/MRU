import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const PROTECTED_PATH = /^\/(en|fr)\/dashboard(\/.*)?$/;
const AUTH_PATHS = ["/en/login","/fr/login","/en/register","/fr/register"];

export async function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  const pathname = request.nextUrl.pathname;
  if (PROTECTED_PATH.test(pathname)) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const locale = pathname.split("/")[1] || routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }
  if (AUTH_PATHS.includes(pathname)) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const locale = pathname.split("/")[1] || routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
