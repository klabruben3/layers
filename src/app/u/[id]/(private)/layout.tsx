import { auth } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function PrivateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const {id} = await params
  const isOwner = session?.user.id === id;

  if(!isOwner) notFound()

  return <>{children}</>;
}