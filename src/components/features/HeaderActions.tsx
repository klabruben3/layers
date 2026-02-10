"use client";
import { Post, Search, ThemeToggle } from "../ui";
import { useLoginContext, useMediaQuery } from "@/contexts";

export default function HeaderActions() {
  const device = useMediaQuery();
  const { setShowLogin } = useLoginContext();

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
        <button
          onClick={() => {
            setShowLogin(true);
          }}
          className="cursor-pointer py-1 px-2 hover:text-primary hover:outline-white/20 transition-colors duration-200 rounded-md bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]"
        >
          Sign In
        </button>
      </div>
    </>
  );
}
