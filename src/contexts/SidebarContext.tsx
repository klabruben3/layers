"use client";

import { Children } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SidebarContextProp {
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
}

const SidebarContext = createContext<SidebarContextProp | undefined>(undefined);

export function SidebarWidthProvider({ children }: Children) {
  const [width, setWidth] = useState<number>(0);

  return (
    <SidebarContext.Provider value={{ width: width, setWidth: setWidth }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const sidebarWidth = useContext(SidebarContext);
  if (!sidebarWidth) {
    throw new Error(
      "useSidebarContext cannot be used outside the sidebar context provider",
    );
  }

  return sidebarWidth;
}
