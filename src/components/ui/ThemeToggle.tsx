"use client";

import { useThemeContext } from "@/contexts";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { value: theme, setValue: setTheme } = useThemeContext();

  useEffect(() => {
    const html = document.querySelector("html");

    html?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <button
      className="relative outline-1 outline-white flex items-center cursor-pointer bg-gradient-to-tr from-[var(--dark-gray)] via-white/25 to-[var(--dark-gray)] w-[52px] h-5 rounded-full group mr-5"
      onClick={() => (theme == "light" ? setTheme("dark") : setTheme("light"))}
    >
      <motion.div
        initial={{ x: theme == "dark" ? -3 : 27 }}
        animate={{ x: theme === "dark" ? 27 : -3 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute bg-background/30 text-white outline outline-[var(--primary-color)] group-hover:outline-white group-hover:text-[var(--primary-color)] p-[2px] w-fit rounded-full origin-right"
      >
        {theme == "light" ? <Moon /> : <Sun />}
      </motion.div>
    </button>
  );
}
