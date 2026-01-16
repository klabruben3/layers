import { Plus } from "lucide-react";

export default function Post() {
  return (
    <button className="bg-[var(--orange-yellow)] flex gap-1 cursor-pointer rounded-border py-1 px-1.5 text-black">
      <Plus width={16}/>
      <span>Post</span>
    </button>
  );
}