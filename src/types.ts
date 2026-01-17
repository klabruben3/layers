import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type Children = { children: React.ReactNode };
export type ContextState<T> = {
    theme: T;
    setTheme: Dispatch<SetStateAction<T>>
}
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