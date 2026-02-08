"use client";
import { Layers2 } from "lucide-react";
import { Roboto_Slab } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const RobotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

function LogoImage() {
  return (
    <span className="z-10 group-hover:text-primary transition-[color] duration-200 rounded-border bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]">
      <Layers2 width={24} className="m-2" />
    </span>
  );
}

function Layers() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const startIncrement = () => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= 6) {
          stopInterval();
          return 6;
        }
        return prev + 1;
      });
    }, 70);
  };

  const startDecrement = () => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev <= -1) {
          stopInterval();
          return -1;
        }
        return prev - 1;
      });
    }, 70);
  };

  return (
    <div
      className={`${RobotoSlab.className} text-xl`}
      onMouseEnter={startIncrement}
      onMouseLeave={startDecrement}
    >
      <span className="text-sm text-primary">i</span>
      {"Layers".split("").map((letter, i) => (
        <span
          key={i}
          className={currentIndex === i ? "text-primary" : "text-white"}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

export default function Logo() {
  return (
    <button className="group flex items-center gap-[10] cursor-pointer">
      <LogoImage />
      <Layers />
    </button>
  );
}

export { Layers, LogoImage };
