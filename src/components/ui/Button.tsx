import { Children } from "@/types";

interface ButtonProp extends Children {
  className?: string;
  OnPointerUp?: () => void;
}

export default function Button({
  children,
  className,
  OnPointerUp,
}: ButtonProp) {
  return (
    <button
      onPointerUp={OnPointerUp}
      className={`${className} group hover:bg-[#1F2021] rounded-[10px] p-[10px] cursor-pointer p-5`}
    >
      {children}
    </button>
  );
}
