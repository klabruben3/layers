import {
  Bookmark,
  Code2,
  Compass,
  Home,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  BarChart3,
  User,
  Shield,
  Database,
} from "lucide-react";
import { NavLinkProp } from "@/types";

export const mainNav: NavLinkProp[] = [
  { title: "Home", icon: Home },
  { title: "Explore", icon: Compass },
  { title: "Trending", icon: TrendingUp },
  { title: "Saved", icon: Bookmark },
  { title: "Following", icon: Users },
  { title: "My Components", icon: Code2 },
];

export const profileNav: NavLinkProp[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: (id) => `/u/${id}/dashboard` },
  { title: "My Components", icon: Code2, href: (id) => `/u/${id}/mycomponents` },
  { title: "Analytics", icon: BarChart3, href: (id) => `/u/${id}/analytics` },
  { title: "Profile", icon: User, href: (id) => `/u/${id}/profile` },
  { title: "Settings", icon: Settings, href: (id) => `/u/${id}/settings`, type: "private" },
  { title: "Security", icon: Shield, href: (id) => `/u/${id}/security`, type: "private" },
  { title: "Data / Privacy", icon: Database, href: (id) => `/u/${id}/privacy`, type: "private" },
];
