"use client";
import { Children, NavigationTitle } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface NavigationProp {
  navTitle: NavigationTitle;
  setNavTitle: Dispatch<SetStateAction<NavigationTitle>>;
}

const NavigationContext = createContext<NavigationProp | undefined>(undefined);

function NavigationContextProvider({ children }: Children) {
  const [navTitle, setNavTitle] = useState<NavigationTitle>("Home");

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
