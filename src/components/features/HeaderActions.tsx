"use client";
import { useSession } from "next-auth/react";
import { Post, Search, ThemeToggle, LogIn, LogOut } from "../ui";
import { useMediaQuery } from "@/contexts";

export default function HeaderActions() {
  const { data: session } = useSession();
  const device = useMediaQuery();

  return (
    <>
      {device == "desktop" && <Search className="w-[35%]" />}
      <div className="flex gap-3 items-center">
        {device == "desktop" && (
          <>
            <Post />
            <ThemeToggle />
          </>
        )}
        {session ? <LogOut /> : <LogIn />}
      </div>
    </>
  );
}
