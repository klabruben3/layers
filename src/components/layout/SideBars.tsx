"use client";

import { useMediaQuery } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "../features";

function LeftSideBar() {
  const device = useMediaQuery();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [navState, setNavState] = useState<"open" | "closed">("closed");
  const [extend, setExtend] = useState(false);

  useEffect(() => {
    if (device !== "mobile") {
      setNavState("open");
    } else {
      setNavState("closed");
    }
  }, [device]);

  function usePointerReveal<T extends HTMLElement>({
    enabled,
    ref,
    onReveal,
    onClose,
    boundaryId,
  }: {
    enabled: boolean;
    ref: React.RefObject<T | null>;
    onReveal: () => void;
    onClose: () => void;
    boundaryId: string;
  }) {
    useEffect(() => {
      if (!enabled) return;

      const el = ref.current;
      if (!el) return;

      const onMove = (e: PointerEvent) => {
        const hit = document.elementFromPoint(e.clientX, e.clientY);
        if (hit?.id !== boundaryId) onReveal();
      };

      const onUp = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
      };

      const onDown = (e: PointerEvent) => {
        el.setPointerCapture(e.pointerId);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", onUp);
      };

      const onClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).id !== boundaryId) onClose();
      };

      el.addEventListener("pointerdown", onDown);
      window.addEventListener("click", onClick);

      return () => {
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("click", onClick);
      };
    }, [enabled, ref, onReveal, onClose, boundaryId]);
  }

  usePointerReveal({
    enabled: device === "mobile",
    ref: triggerRef,
    boundaryId: "sidebar",
    onReveal: () => setNavState("open"),
    onClose: () => setNavState("closed"),
  });

  usePointerReveal({
    enabled: device === "tablet",
    ref: sidebarRef,
    boundaryId: "sidebar",
    onReveal: () => setExtend(true),
    onClose: () => setExtend(false),
  });

  return (
    <>
      {device == "mobile" && (
        <button
          id="target"
          ref={triggerRef}
          className="touch-none absolute left-0 top-0 w-3 h-full bg-[red]/30"
        />
      )}
      <AnimatePresence>
        {navState === "open" && (
          <motion.aside
            key="nav"
            id="sidebar"
            ref={sidebarRef}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="select-none touch-none h-full bg-background border-r-2 border-[var(--gray)] absolute min-[375px]:static"
          >
            <Navigation device={device} extend={extend} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function RightSideBar() {
  const device = useMediaQuery();
  return (
    <>
      {device == "desktop" && (
        <aside className="w-50 h-full bg-background border-l-2 border-[var(--gray)]"></aside>
      )}
    </>
  );
}

export { LeftSideBar, RightSideBar };
