"use client";

import { AnimatePresence, motion } from "motion/react";

export default function LoadingNav({ extend }: { extend: boolean }) {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 rounded-full bg-neutral-700 outline-2 outline-neutral-500 animate-pulse" />

      <AnimatePresence>
        {extend && (
          <>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 10 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2 }}
              className="h-4 rounded bg-neutral-700 animate-pulse"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
