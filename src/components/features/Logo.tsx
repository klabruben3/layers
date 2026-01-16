import { Layers2 } from "lucide-react";
import { Roboto_Slab } from "next/font/google";

const RobotoSlab = Roboto_Slab();

export function LogoImage() {
  return (
    <span className="group-hover:text-primary transition-[color] duration-200 rounded-border bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]">
      <Layers2 width={24} className="m-2" />
    </span>
  );
}

export default function Logo() {
  return (
    <button className="group flex items-center gap-[10] cursor-pointer">
      <LogoImage />
      <span className={`${RobotoSlab.className} text-xl`}>Layer</span>
    </button>
  );
}
