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
import { AnimatePresence, motion } from "motion/react";
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
    <div className="flex flex-col items-center">
      <div className="p-global">
        {navLinks.map((navLink, i) => (
          <Button
            onClick={() => {
              setNavTitle(navLink.title);
            }}
            title={navLink.title}
            key={navLink.title}
            className={`${
              navTitle == navLink.title
                ? "text-primary bg-[var(--dark-gray)]"
                : "text-white"
            } flex gap-2 w-full ${i >= navLinks.length -1 ? null : "mb-1"}`}
          >
            <navLink.icon width={24} />
            <AnimatePresence>
              {(device == "mobile" || device == "desktop" || extend) && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <span className="block whitespace-nowrap">
                    {navLink.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        ))}
      </div>
      <div
        className={`h-[1px] bg-[var(--gray)] w-[80%] ${
          device == "tablet" ? "mx-2" : "mx-5"
        }`}
      />
      <button className="w-[45px] h-[45px] border-2 rounded-full cursor-pointer mt-auto"/>
    </div>
  );
}
