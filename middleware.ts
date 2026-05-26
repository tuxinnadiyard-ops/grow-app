import { NextRequest, NextResponse } from "next/server";

export function middleware(
  request: NextRequest
) {
  const session =
    request.cookies.get(
      "session"
    )?.value;

  const isDashboard =
    request.nextUrl.pathname.startsWith(
      "/dashboard"
    );

  if (
    isDashboard &&
    !session
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};