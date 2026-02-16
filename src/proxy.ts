import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth/auth";

export default async function proxy(req: NextRequest) {
  const session = await auth();

  if (!session) {
    console.log("We have a guest", req.nextUrl)
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/u/:path*",
};
