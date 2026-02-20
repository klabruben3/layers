"use client";
import { Children, ContextState } from "@/types";
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<ContextState<Theme> | undefined>(undefined);

export function ThemeProvider({ children }: Children) {
  const [theme, setTheme] = useState<Theme>("dark");
  return (
    <ThemeContext.Provider value={{ value: theme, setValue: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("ThemeContext cannot be used outside the ThemeProvider.");
  }
  return theme;
}
