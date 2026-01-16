"use client";

import { useThemeContext } from "@/contexts";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  useEffect(() => {
    const html = document.querySelector("html");

    html?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <button
      className="cursor-pointer bg-gradient-to-tr from-[var(--dark-gray)] via-white/25 to-[var(--dark-gray)] w-[52px] rounded-full group mr-5"
      onClick={() => (theme == "light" ? setTheme("dark") : setTheme("light"))}
    >
      <motion.div
        initial={{ x: theme == "dark" ? 0 : 24 }}
        animate={{ x: theme === "dark" ? 24 : 0 }}
        transition={{
          x: { type: "spring", stiffness: 500, damping: 30 },
        }}
        className="shadow-[0_0_3px_var(--primary-color)] bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] p-[2px] w-fit rounded-full text-white group-hover:text-primary duration-200"
      >
        {theme == "light" ? <Moon /> : <Sun />}
      </motion.div>
    </button>
  );
}
