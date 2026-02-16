"use client";

import { redirect } from "next/navigation";

export default function LogIn() {
  return (
    <button
      onClick={() => {
        redirect("login");
      }}
      className="cursor-pointer py-1 px-2 hover:text-primary hover:outline-white/20 transition-colors duration-200 rounded-md bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]"
    >
      Sign In
    </button>
  );
}
