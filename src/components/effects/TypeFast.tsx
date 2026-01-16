"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface TypeProp {
  className: string;
  setIsTyping?: Dispatch<SetStateAction<boolean>>;
  delay?: number;
  elementType?: React.ElementType;
  text: string;
}

export default function TypeFast({
  text,
  className,
  setIsTyping,
  delay = 200,
  elementType: Element = "span",
}: TypeProp) {
  const wrapperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.textContent = "";
    let cancelled = false;

    const type = async () => {
      for (const char of text) {
        if (cancelled) return;
        wrapper.textContent += char;

        const offset = char == "," || char == ";" ? delay * 3 : 0;
        await new Promise((res) => setTimeout(res, delay + offset));
      }

      if (setIsTyping) setIsTyping(false);
    };

    type();

    return () => {
      cancelled = true;
      if (setIsTyping) setIsTyping(true);
    };
  }, [text]);

  return (
    <Element className={className} ref={wrapperRef}>
      {text}
    </Element>
  );
}
