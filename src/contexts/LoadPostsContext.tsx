"use client";
import { Children } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface LoadProp {
  isBottom: boolean;
  setIsBottom: Dispatch<SetStateAction<boolean>>;
}

const LoadPostsContext = createContext<LoadProp | undefined>(undefined);

function LoadPostsContextProvider({ children }: Children) {
  const [isBottom, setIsBottom] = useState(false);

  return (
    <LoadPostsContext.Provider
      value={{ isBottom: isBottom, setIsBottom: setIsBottom }}
    >
      {children}
    </LoadPostsContext.Provider>
  );
}

function useLoadContext() {
  const load = useContext(LoadPostsContext);
  if (!load) {
    throw new Error(
      "useLoadContext cannot be used outside the LoadPostsContext provider",
    );
  }

  return load;
}

export { LoadPostsContextProvider, useLoadContext };
