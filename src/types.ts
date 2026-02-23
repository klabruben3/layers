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
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};
export type NavProp = "open" | "closed";

export interface NavLinkProp {
  title: string;
  icon: LucideIcon;
  href?: (id:string) => string
  type?: "private" | "public"
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
