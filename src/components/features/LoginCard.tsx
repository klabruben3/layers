"use client";

import { useLoginContext } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { GitHub, Google } from "../icons";
import { ChevronDown } from "lucide-react";

export default function LoginCard() {
  const { showLogin, setShowLogin } = useLoginContext();
  return (
    <AnimatePresence>
      {showLogin && (
        <div className="z-20 fixed inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowLogin(false)}
            className="absolute top-0 left-0 w-full h-full bg-primary/5 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              transform: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.2 },
            }}
            className="w-100 z-1 border-2 border-[var(--gray)] p-10 rounded-lg bg-foreground/70"
          >
            <div className="flex flex-col items-center mb-3 gap-5">
              <span className="text-2xl">Sign in</span>
              <p className="text-white/40 text-center">
                Publish and share UI components with the community.
              </p>
            </div>
            <div className="flex flex-col gap-2 font-bold mb-3">
              <button className="cursor-pointer w-full flex items-center gap-2 rounded-lg p-3 border">
                <GitHub />
                <span>Continue with GitHub</span>
              </button>
              <button className="cursor-pointer w-full flex gap-2 rounded-lg p-3 border bg-white text-black">
                <Google />
                <span>Continue with Google</span>
              </button>
            </div>
            <button className="flex items-center gap-2 uppercase group cursor-pointer text-white/40 text-sm mx-auto mb-10">
              <span className="group-hover:text-white transition-[color] duration-100 ease-out">
                More options
              </span>
              <ChevronDown className="group-active:text-white group-active:translate-y-1 transition-transform duration-100 ease-out" />
            </button>
            <p className="text-center text-white/40 text-sm">
              By continuing, you agree to our{" "}
              <a className="hover:text-primary text-primary/75 active:text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="hover:text-primary text-primary/75 active:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
