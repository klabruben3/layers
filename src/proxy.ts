import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const {pathname} = req.nextUrl
  const id = pathname.split("/")[2]

  console.log(id)

  return NextResponse.next();
}

export const config = {
  matcher: "/u/:path*",
};
