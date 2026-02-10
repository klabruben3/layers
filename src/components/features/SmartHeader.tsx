"use client";
import { useMediaQuery, useSidebarContext } from "@/contexts";
import { Children } from "@/types";
import { useEffect, useRef, useState } from "react";
import { usePointerReveal } from "../ui";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "../ui";
import { Post } from "../ui";

export default function SmartHeader({ children }: Children) {
  const device = useMediaQuery();
  const openTriggerRef = useRef<HTMLElement | null>(null);
  const [search, setSearch] = useState<"open" | "closed">("closed");
  const [topPos, setTopPos] = useState<number>(0);
  const { width } = useSidebarContext();
  const closeTriggerRef = useRef<HTMLDivElement | null>(null);

  usePointerReveal({
    enabled: device !== "desktop",
    open: search == "open",
    triggerAxis: "vertical",
    triggerOffset: 50,
    ref: { reveal: openTriggerRef, close: closeTriggerRef },
    onReveal: () => setSearch("open"),
    onClose: () => setSearch("closed"),
  });

  useEffect(() => {
    const header = openTriggerRef.current;
    if (!header) return;
    setTopPos(header.offsetHeight);
  }, [topPos]);

  return (
    <>
      <header
        ref={openTriggerRef}
        className="z-10 relative flex justify-between items-center p-global w-full border-b-2 border-[var(--gray)] select-none"
      >
        {children}
      </header>
      {device != "desktop" && (
        <AnimatePresence>
          {search == "open" && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              ref={closeTriggerRef}
              transition={{
                y: { type: "spring", stiffness: 350, damping: 20 },
                opacity: { duration: 0.2 },
              }}
              style={{
                top: `${topPos}px`,
                marginLeft: `${width}px`,
                width: `calc(100% - ${width}px)`,
              }}
              className="z-5 absolute left-0 flex gap-2 p-global"
            >
              <Search className="flex-1 outline-2 outline-primary" />
              <Post />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
