"use server";

import { Provider } from "@/types";
import { signIn } from "./auth";

async function logIn(provider: Provider, redirect: string) {
  await signIn(provider, { redirectTo: redirect });
}

export { logIn };
