"use client";

import { logIn } from "@/lib/auth/actions";
import { ProviderProp } from "@/types";

export default function LoginButton({
  provider,
  className,
}: {
  provider: ProviderProp;
  className?: string;
}) {
  return (
    <button
      onClick={() => logIn(provider.provider, "/")}
      className={`${className} cursor-pointer w-full flex items-center gap-2 rounded-lg p-3 border font-bold`}
    >
      <provider.icon width={20} />
      <span>
        Continue with <span className="capitalize">{provider.name}</span>
      </span>
    </button>
  );
}
