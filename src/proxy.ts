import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth/auth";

export default async function proxy(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const id = session.user?.id;
  if (!id) throw new Error("user does not have an id");

  return NextResponse.next();
}

export const config = {
  matcher: "/u/:path*",
};
