"use client";

import { useNavContext } from "@/contexts";
import { completeOnboarding } from "@/lib/actions/onBoarding";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { setNavTitle } = useNavContext();
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await completeOnboarding()
        setNavTitle("explore");
        router.push("/");
      }}
      className="bg-white text-black font-bold cursor-pointer hover:text-gray-500"
    >
      go back
    </button>
  );
}
