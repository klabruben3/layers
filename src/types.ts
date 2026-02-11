import { LucideIcon } from "lucide-react";
import { ComponentType, Dispatch, SetStateAction, SVGProps } from "react";

export type ProviderName =
  | "google"
  | "github"
  | "gitlab"
  | "discord"
  | "microsoft";
export type ProviderProp = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  provider: Provider;
  name: ProviderName;
};
export type ProviderInfo = {
  [key in ProviderName]: ProviderProp;
};

export type Children = { children: React.ReactNode };
export type ContextState<T> = {
  theme: T;
  setTheme: Dispatch<SetStateAction<T>>;
};
export type NavProp = "open" | "closed";
export type NavigationTitle =
  | "Home"
  | "Explore"
  | "Trending"
  | "Saved"
  | "Following"
  | "My Components";
export interface NavLinkProp {
  title: NavigationTitle;
  icon: LucideIcon;
}

export type Provider =
  | "github"
  | "google"
  | "discord"
  | "gitlab"
  | "microsoft-entra-id";

type PostStatus = "verified" | "community";

type Framework = "react" | "next" | "vanilla" | "angular" | "vue";

interface PostAuthor {
  userId: string;
  name: string;
  image: string;
  profileLink: string;
  reputationScore: number;
}

export interface UserParamProp {
  params: { id: string };
}

interface Code {
  value: string;
  highlighted: string;
}

interface PostContent {
  preview: { type: "image"; src: string } | { type: "video"; src: string };
  code: {
    language: string;
    product: Code;
  };
  usage: { dependencies: Record<string, string>; codeExample: Code };
}

interface PostEngagement {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

type PostVisibility = "public" | "private";

type License = "MIT" | "Apache-2.0" | "GPL" | "Unlicensed";

export interface Post {
  id: string;
  author: PostAuthor;
  status: PostStatus;
  framework: Framework;
  title: string;
  description: string;
  tags?: string[];
  content: PostContent;
  engagement: PostEngagement;
  createdAt: string;
  updatedAt?: string;
  visibility: PostVisibility;
  license: License;
}
