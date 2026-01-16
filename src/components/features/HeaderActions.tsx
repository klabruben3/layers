"use client";
import { Search, ThemeToggle, SignIn, Post } from "@/components/features";
import { useMediaQuery } from "@/contexts";

export default function HeaderActions() {
  const device = useMediaQuery();
  return (
    <>
      {device == "desktop" && <Search />}
      <div className="flex gap-3 items-center">
        {device == "desktop" && (
          <>
            <Post />
            <ThemeToggle />
          </>
        )}
        <SignIn />
      </div>
    </>
  );
}
