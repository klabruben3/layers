"use client";
import { Post, Search, ThemeToggle, AuthenticateButton } from "../ui";
import { useMediaQuery } from "@/contexts";

export default function HeaderActions() {
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
        <AuthenticateButton />
      </div>
    </>
  );
}
