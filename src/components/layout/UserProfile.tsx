// import { prisma } from "@/lib/prisma";

export default async function UserProfile({
  userId,
  isOwner,
}: {
  userId: string;
  isOwner: boolean;
}) {
  // const user = await prisma.user.findUnique({where: {id: userId}})
  return <div>Exe, {userId}</div>;
}
