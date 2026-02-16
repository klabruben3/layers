// import { prisma } from "@/lib/prisma";

export default async function UserProfile({
  userId,
  isOwner,
}: {
  userId: string;
  isOwner: boolean;
}) {
  console.log("isOwner:", isOwner, "userId:", userId)
  return <div>Exe, {userId}</div>;
}
