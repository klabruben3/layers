"use client";

import { Device } from "@/contexts";
import {
  Bookmark,
  Code2,
  Compass,
  Home,
  LucideIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import { motion } from "motion/react";

type NavigationTitle =
  | "Home"
  | "Explore"
  | "Trending"
  | "Saved"
  | "Following"
  | "My Components";
interface NavLinkProp {
  title: NavigationTitle;
  icon: LucideIcon;
}

export default function Navigation({
  device,
  extend,
}: {
  device: Device;
  extend: boolean;
}) {
  const navLinks: NavLinkProp[] = [
    { title: "Home", icon: Home },
    { title: "Explore", icon: Compass },
    { title: "Trending", icon: TrendingUp },
    { title: "Saved", icon: Bookmark },
    { title: "Following", icon: Users },
    { title: "My Components", icon: Code2 },
  ];
  const [navState, setNavState] = useState<NavigationTitle>("Home");

  return (
    <>
      <div className="p-global">
        {navLinks.map((navLink, i) => (
          <Button
            onClick={() => setNavState(navLink.title)}
            key={navLink.title}
            className={`${
              navState == navLink.title
                ? "text-primary bg-[var(--dark-gray)]"
                : "text-white"
            } flex gap-2 w-full`}
          >
            <navLink.icon width={24} />
              {(device == "mobile" || device == "desktop" || extend) && (
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 15 },
                      opacity: { duration: 0.5 },
                    }}
                    style={{ transitionDelay: `${i * 0.5}ms` }}
                    className="block"
                  >
                    {navLink.title}
                  </motion.span>
                </div>
              )}
          </Button>
        ))}
      </div>
      <div
        className={`h-[1px] bg-[var(--gray)] ${
          device == "tablet" ? "mx-2" : "mx-5"
        }`}
      />
    </>
  );
}
