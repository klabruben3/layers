import { NextResponse, NextRequest } from "next/server";
import { auth } from "./lib/auth/auth";

export async function proxy(req: NextRequest) {
  const session = await auth();
  console.log("look at this mf", req.url);
}

export const config = {
  matcher: ["/u/:path*"],
};
