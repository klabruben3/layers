"use server";

import { Provider } from "@/types";
import { signIn, signOut } from "./auth";

async function logIn(provider: Provider, redirect: string) {
  await signIn(provider, { redirectTo: redirect });
}
async function logOut(redirect: string) {
  await signOut({ redirectTo: redirect });
}

export { logIn, logOut };
