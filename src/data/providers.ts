import { Discord, Github, Gitlab, Google, Microsoft } from "@/components/icons";
import { ProviderInfo } from "@/types";

export const providers: ProviderInfo = {
  google: { icon: Google, name: "google", provider: "google" },
  github: { icon: Github, name: "github", provider: "github" },
  gitlab: { icon: Gitlab, name: "gitlab", provider: "gitlab" },
  discord: { icon: Discord, name: "discord", provider: "discord" },
  microsoft: {
    icon: Microsoft,
    name: "microsoft",
    provider: "microsoft-entra-id",
  },
};
