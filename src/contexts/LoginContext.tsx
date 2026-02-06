"use client";
import { Children } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LoginState = {
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
};

const LoginContext = createContext<LoginState | undefined>(undefined);

function LoginContextProvider({ children }: Children) {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <LoginContext.Provider
      value={{ showLogin: showLogin, setShowLogin: setShowLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

function useLoginContext() {
  const loginState = useContext(LoginContext);

  if (!loginState) {
    throw new Error(
      "Login Context cannot be used outside the Login Context Provider.",
    );
  }

  return loginState;
}

export { LoginContextProvider, useLoginContext };
