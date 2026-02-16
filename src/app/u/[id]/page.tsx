import { UserProfile } from "@/components/layout";
import { auth } from "@/lib/auth/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  const isOwner = session?.user?.id === id ? true : false;

  return <UserProfile userId={id} isOwner={isOwner} />;
}
