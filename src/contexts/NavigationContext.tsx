"use client";
import { Children } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface NavigationProp {
  navTitle: string | null;
  setNavTitle: Dispatch<SetStateAction<string | null>>;
}

const NavigationContext = createContext<NavigationProp | undefined>(undefined);

function NavigationContextProvider({ children }: Children) {
  const [navTitle, setNavTitle] = useState<string | null>(null);

  return (
    <NavigationContext.Provider
      value={{ navTitle: navTitle, setNavTitle: setNavTitle }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

function useNavContext() {
  const nav = useContext(NavigationContext);

  if (!nav) {
    throw new Error(
      "useNavContext cannot be used outside of the nav context provider",
    );
  }

  return nav;
}

export { useNavContext, NavigationContextProvider };
