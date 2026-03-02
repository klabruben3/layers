"use client";

import { Device, useNavContext } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { mainNav, profileNav } from "@/data/navigation";
import { usePathname } from "next/navigation";
import { RingSpin } from "../effects";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Navigation({
  device,
  extend,
  animationComplete,
  setAnimationComplete,
}: {
  device: Device | null;
  extend: boolean;
  setAnimationComplete: (animationComplete: boolean) => void;
  animationComplete: boolean;
}) {
  const [showPost, setShowPost] = useState(false);
  const { navTitle, setNavTitle } = useNavContext();
  const router = useRouter();

  const pathname = usePathname();

  // Security
  const { data: session, status } = useSession();
  const { id } = useParams<{ id: string }>();

  const isOwner = session?.user.id === id;

  if (status === "loading") {
    return <RingSpin className="m-1" />;
  }

  const isUserPage = pathname.startsWith("/u");

  const navLinks = isUserPage
    ? profileNav.filter((link) => isOwner || link.type !== "private")
    : mainNav;

  return (
    <>
      <motion.div
        layout
        initial={{ width: 0 }}
        animate={{
          width:
            device == "mobile" || device == "desktop" || extend
              ? "auto"
              : "32px",
        }}
        exit={{ width: 0 }}
        onAnimationStart={() => setAnimationComplete(false)}
        onAnimationComplete={() => {
          setAnimationComplete(true);
          setShowPost(extend ? true : false);
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-2"
      >
        {navLinks.map((navLink, i) => (
          <button
            onClick={() => {
              if (navLink.href) {
                router.push(navLink.href(id));
              } else {
                setNavTitle(navLink.title);
              }
            }}
            title={navLink.title}
            key={navLink.title}
            className="flex items-center cursor-pointer group"
          >
            <div
              className={`${
                (
                  navLink.href
                    ? pathname == navLink.href(id)
                    : navTitle === navLink.title
                )
                  ? "bg-[wheat]/20 text-white outline-2 outline-primary"
                  : "text-[wheat]/35 group-hover:text-primary"
              } rounded-full w-8 h-8 flex items-center justify-center shrink-0`}
            >
              <navLink.icon width={20} />
            </div>
            <AnimatePresence>
              {(device == "mobile" || device == "desktop" || extend) && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.1 }}
                  className={`${
                    (
                      navLink.href
                        ? pathname == navLink.href(id)
                        : navTitle === navLink.title
                    )
                      ? "text-white"
                      : "text-white/35 group-hover:text-primary scale-90 group-hover:scale-100 origin-left transition-transform duration-200"
                  } block whitespace-nowrap ml-[10px]`}
                >
                  {navLink.title}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.div>
      {!isUserPage && <div className="h-[1px] bg-[var(--gray)] mx-1" />}
      {/* {device === "tablet" && !extend && (
        <button className="rounded-md w-8 h-8 flex items-center justify-center cursor-pointer bg-[wheat]/20 focus:outline-2 outline-zinc-500 active:text-primary">
          <Menu width={20} />
        </button>
        )} */}
      <button className="flex items-center cursor-pointer gap-global group">
        <div className="rounded-md w-8 h-8 bg-[wheat]/20 outline-2 outline-zinc-500 flex justify-center items-center">
          <Plus
            width={20}
            className="group-active:text-primary group-active:scale-75"
          />
        </div>
        {(device == "mobile" ||
          device == "desktop" ||
          (showPost && extend)) && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="whitespace-nowrap"
          >
            Post
          </motion.span>
        )}
      </button>
      {session && !isUserPage && (
        <button
          onClick={() => router.push(`/u/${session.user?.id}/dashboard`)}
          className="w-8 h-8 border-2 border-primary rounded-full cursor-pointer mt-auto overflow-hidden"
        >
          <img
            src={session.user?.image ?? "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      )}
    </>
  );
}
