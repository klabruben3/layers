import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function UserRedirect() {
  const session =  await auth()
  if(!session) redirect("/")
  
  redirect(`/u/${session?.user.id}/dashboard`);
}
