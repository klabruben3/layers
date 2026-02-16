import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../prisma";

// Providers
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Gitlab from "next-auth/providers/gitlab";
import Microsoft from "next-auth/providers/microsoft-entra-id";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [GitHub, Google, Discord, Gitlab, Microsoft],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authOptions);
