import { UserProfile } from "@/components/layout";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const iLayersU = await prisma.user.findUnique({ where: { id: id } });

  if (!iLayersU) notFound();

  const isOwner = session?.user.id === id;

  return <UserProfile userId={session?.user.id} isOwner={isOwner} />;
}
