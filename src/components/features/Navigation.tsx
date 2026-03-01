"use client";

import { Device, useNavContext } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { mainNav, profileNav } from "@/data/navigation";
import { usePathname } from "next/navigation";
import {RingSpin} from "../effects";

export default function Navigation({
  device,
  extend,
  setAnimationComplete,
}: {
  device: Device | null;
  extend: boolean;
  setAnimationComplete: (animationComplete: boolean) => void;
}) {
  const { navTitle, setNavTitle } = useNavContext();
  const router = useRouter();

  const pathname = usePathname();

  // Security
  const { data: session, status } = useSession();
  const { id } = useParams<{ id: string }>();

  const isOwner = session?.user.id === id;

  if (status === "loading") {
    return (
      <RingSpin className="m-1" />
    );
  }

  const isUserPage = pathname.startsWith("/u");

  const navLinks = isUserPage
    ? profileNav.filter((link) => isOwner || link.type !== "private")
    : mainNav;

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width:
            device == "mobile" || device == "desktop" || extend ? "auto" : 0,
        }}
        exit={{ width: 0 }}
        onAnimationStart={() => setAnimationComplete(false)}
        onAnimationComplete={() => setAnimationComplete(true)}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-2"
      >
        {navLinks.map((navLink) => (
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
                <span
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
                </span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.div>
      {!isUserPage && <div className="h-[1px] bg-[var(--gray)] mx-1" />}
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
