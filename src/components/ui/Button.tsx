"use client";
import { Children } from "@/types";

interface ButtonProp extends Children {
  className?: string;
  onClick?: () => void;
  title?: string;
}

export default function Button({
  children,
  title,
  className,
  onClick,
}: ButtonProp) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`${className} group hover:bg-[#1F2021] rounded-[10px] p-[10px] cursor-pointer p-5`}
    >
      {children}
    </button>
  );
}
