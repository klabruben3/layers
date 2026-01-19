"use client";

import { useMediaQuery, useSidebarContext } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "../features";
import { NavProp } from "@/types";
import { usePointerReveal } from "../ui";

function LeftSideBar() {
  const device = useMediaQuery();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [navState, setNavState] = useState<NavProp>("closed");
  const [extend, setExtend] = useState(false);
  const { setWidth } = useSidebarContext();

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (device !== "mobile") {
      setNavState("open");
    } else {
      setNavState("closed");
    }
  }, [device]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (device != "tablet") {
      setWidth(0);
      return;
    }
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    setWidth(sidebar.offsetWidth);
  }, [device, navState, extend, setWidth]);

  usePointerReveal({
    enabled: device === "mobile",
    open: navState == "open",
    triggerAxis: "horizontal",
    triggerOffset: 50,
    ref: { reveal: triggerRef, close: sidebarRef },
    onReveal: () => setNavState("open"),
    onClose: () => setNavState("closed"),
  });

  usePointerReveal({
    open: extend,
    enabled: device === "tablet",
    triggerAxis: "horizontal",
    triggerOffset: 50,
    forceRerender: navState,
    ref: { reveal: sidebarRef, close: sidebarRef },
    onReveal: () => setExtend(true),
    onClose: () => setExtend(false),
  });

  return (
    <>
      {device == "mobile" && (
        <button
          ref={triggerRef}
          className="z-5 absolute left-0 top-0 w-3 h-full"
        />
      )}
      <AnimatePresence>
        {navState == "open" && (
          <>
            <motion.aside
              key="nav"
              ref={sidebarRef}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="select-none h-full bg-background border-r-2 border-[var(--gray)] absolute min-[500px]:static z-10"
            >
              <Navigation device={device} extend={extend} />
            </motion.aside>

            {device == "mobile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 backdrop-blur-md z-5"
              />
            )}
          </>
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
