"use client";

import { useEffect, useRef, useState } from "react";
import { Roboto_Slab } from "next/font/google";

const RobotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  preload: false,
});

export default function SweepText({
  className = `${RobotoSlab.className} text-xl`,
  textToSweep = "Beware, I am the Sweep.",
  sweepTextProp = "text-primary",
  defaultTextProp = "text-white",
  speed = 70,
  beforeSweepText,
  afterSweepText,
  isTriggered,
  start = "beforebegin",
  end = "afterend",
}: {
  className?: string;
  sweepTextProp?: string;
  defaultTextProp?: string;
  textToSweep?: string;
  beforeSweepText?: React.ReactNode;
  afterSweepText?: React.ReactNode;
  speed?: number;
  isTriggered: boolean;
  start?: "beforebegin" | "afterbegin";
  end?: "beforeend" | "afterend";
}) {
  const last = textToSweep.length - (end === "beforeend" ? 1 : 0);
  const first = start === "beforebegin" ? -1 : 0;

  const [currentIndex, setCurrentIndex] = useState(first);
  const rAFRef = useRef<ReturnType<typeof requestAnimationFrame> | undefined>(
    undefined,
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const triggeredRef = useRef(isTriggered);

  const stopRAF = () => {
    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
      rAFRef.current = undefined;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  const forward = async () => {
    setCurrentIndex((prev) => {
      if (prev >= last) {
        stopRAF();
        return prev;
      }
      return prev + 1;
    });

    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, speed);
    });

    if (!triggeredRef.current) return;
    rAFRef.current = requestAnimationFrame(forward);
  };

  const reverse = async () => {
    setCurrentIndex((prev) => {
      if (prev <= first) {
        stopRAF();
        return prev;
      }
      return prev - 1;
    });

    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, speed);
    });

    if (triggeredRef.current) return;
    rAFRef.current = requestAnimationFrame(reverse);
  };

  useEffect(() => {
    triggeredRef.current = isTriggered;
    stopRAF();

    if (isTriggered) {
      forward();
    } else {
      if (currentIndex !== first) reverse();
    }

    return () => stopRAF();
  }, [isTriggered]);

  return (
    <span className={className}>
      {beforeSweepText}
      {textToSweep.split("").map((letter, i) => (
        <span
          key={i}
          className={currentIndex === i ? sweepTextProp : defaultTextProp}
        >
          {letter}
        </span>
      ))}
      {afterSweepText}
    </span>
  );
}
