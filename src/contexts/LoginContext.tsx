"use client"
import { Children, ContextState } from "@/types";
import { createContext, useContext, useState } from "react";

const LoginContext = createContext<ContextState<boolean> | undefined>(
  undefined,
);

function LoginContextProvider({ children }: Children) {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <LoginContext.Provider value={{ value: showLogin, setValue: setShowLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

function useLoginContext() {
  const LoginState = useContext(LoginContext);

  if (!LoginState) {
    throw new Error(
      "useLoginContext cannot be used outside of the Login Context Provider",
    );
  }

  return LoginState;
}

export { LoginContextProvider, useLoginContext };
