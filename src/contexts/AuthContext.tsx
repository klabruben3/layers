"use client";
import { useSession } from "next-auth/react";
import { Children } from "@/types";
import { createContext, useContext } from "react";
import { Session } from "next-auth";

type Auth = {
  isAuth: boolean;
  session: Session | null;
};

const AuthContext = createContext<Auth | undefined>(undefined);

function AuthProvider({ children }: Children) {
  const { data: session, status } = useSession();

  return (
    <AuthContext.Provider
      value={{ isAuth: status == "authenticated", session: session }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      "useAuthContext cannot be used outside the Authentication Context Provider",
    );
  }

  return auth;
}

export { AuthProvider, useAuthContext };
