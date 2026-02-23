import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const iLayersU = await prisma.user.findUnique({ where: { id: id } });

  if (!iLayersU) notFound();

  return <>{children}</>;
}
