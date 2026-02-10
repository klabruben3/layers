"use client";
import { Plus } from "lucide-react";

export default function Post() {
  return (
    <button className="items-center bg-[var(--orange-yellow)] flex gap-1 cursor-pointer rounded-border p-1.5 text-black">
      <Plus width={16} />
      <span>Post</span>
    </button>
  );
}
