// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // JWT verify karne wala function

export async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    // Redirect to login page
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    await verifyToken(token); // agar verifyToken async hai
    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

// Specify paths where middleware apply hoga
export const config = {
  matcher: ["/tasks/:middleware*"], // sirf /tasks aur uske child routes
};
