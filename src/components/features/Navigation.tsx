"use client";

import { Device, useNavContext } from "@/contexts";
import {
  Bookmark,
  Code2,
  Compass,
  Home,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "../ui/";
import { motion } from "motion/react";
import { NavLinkProp } from "@/types";

export default function Navigation({
  device,
  extend,
}: {
  device: Device | null;
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
  const { navTitle, setNavTitle } = useNavContext();

  return (
    <>
      <div className="p-global">
        {navLinks.map((navLink, i) => (
          <Button
            onClick={() => {
              setNavTitle(navLink.title);
            }}
            key={navLink.title}
            className={`${
              navTitle == navLink.title
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
                  transition={{ duration: 0.2, delay: i * 0.1 }}
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
