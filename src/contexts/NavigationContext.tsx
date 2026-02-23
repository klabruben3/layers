"use client";
import { Children } from "@/types";
import { usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface NavigationProp {
  navTitle: string;
  setNavTitle: Dispatch<SetStateAction<string>>;
}

const NavigationContext = createContext<NavigationProp | undefined>(undefined);

function NavigationContextProvider({ children }: Children) {
  const [navTitle, setNavTitle] = useState<string>("Home");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/u")) {
      setNavTitle("Dashboard");
    } else {
      setNavTitle("Home");
    }
  }, [pathname]);

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
