"use client";

import { useLoginContext } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LoginButton } from "../ui";
import { providers } from "@/data/providers";
import { useState } from "react";

export default function LoginCard() {
  const { showLogin, setShowLogin } = useLoginContext();
  const [showMore, setShowMore] = useState(false);
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
            className="w-90 z-1 border-2 border-[var(--gray)] p-7 rounded-lg bg-foreground/70"
          >
            <div className="flex flex-col items-center mb-3 gap-5">
              <span className="text-2xl">Sign in</span>
              <p className="text-white/40 text-center">
                Publish and share UI components with the community.
              </p>
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <LoginButton provider={providers.github} className="text-white" />
              <LoginButton
                provider={providers.google}
                className="bg-white text-black"
              />
            </div>
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 uppercase group cursor-pointer text-white/40 text-sm mx-auto mb-3"
            >
              <span className="group-hover:text-white transition-[color] duration-100 ease-out">
                {showMore ? "Less" : "More"} options
              </span>
              {showMore ? (
                <ChevronUp className="group-active:text-white group-active:translate-y-1 transition-transform duration-100 ease-out" />
              ) : (
                <ChevronDown className="group-active:text-white group-active:translate-y-1 transition-transform duration-100 ease-out" />
              )}
            </button>
            {showMore && (
              <div className="flex flex-col gap-2">
                <LoginButton provider={providers.discord} />
                <LoginButton provider={providers.gitlab} />
                <LoginButton provider={providers.microsoft} />
              </div>
            )}
            <p className="text-center text-white/40 text-sm mt-10">
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
