"use server"
import prisma from "../prisma";
import { auth } from "../auth/auth";

export async function completeOnboarding() {
  const session = await auth();

  await prisma.user.update({
    where: { id: session?.user.id },
    data: { onboarded: true },
  });
}