import { UserProfile } from "@/components/layout";
import { UserParamProp } from "@/types";
export default async function Page({ params }: UserParamProp) {
  console.log(params.id);

  return <UserProfile userId={params.id} />;
}
