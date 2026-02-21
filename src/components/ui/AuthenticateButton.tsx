"use client";

import { useLoginContext } from "@/contexts";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function LogIn() {
  const { setValue: setShowLogin } = useLoginContext();

  return (
    <button
      onClick={() => {
        setShowLogin(true);
      }}
      className="cursor-pointer py-1 px-2 hover:text-primary hover:outline-white/20 transition-colors duration-200 rounded-md bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]"
    >
      Sign In
    </button>
  );
}

function LogOut() {
  const { setValue: setShowLogin } = useLoginContext();
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/")
    setShowLogin(true);
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer py-1 px-2 hover:text-primary hover:outline-white/20 transition-colors duration-200 rounded-md bg-gradient-to-tr from-primary/10 via-primary/5 to-[var(--dark-gray)] outline-2 outline-[var(--dark-gray)]"
    >
      Log Out
    </button>
  );
}

export default function AuthenticateButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  return <>{session ? <LogOut /> : <LogIn />}</>;
}
