"use client";

import { Device, useNavContext } from "@/contexts";
import { Button } from "../ui/";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { mainNav, profileNav } from "@/data/navigation";
import { usePathname } from "next/navigation";

export default function Navigation({
  device,
  extend,
}: {
  device: Device | null;
  extend: boolean;
}) {
  const { navTitle, setNavTitle } = useNavContext();
  const router = useRouter();

  const pathname = usePathname();

  // Security
  const { data: session, status } = useSession();
  const { id } = useParams<{ id: string }>();

  const isOwner = session?.user.id === id;

  if (status === "loading")
    return <div className="h-[45px] w-[45px] outline-2 animate-spin" />;

  const navLinks = pathname.startsWith("/u")
    ? profileNav.filter((link) => isOwner || link.type !== "private")
    : mainNav;

  const isUserProfile = pathname.startsWith("/u");

  return (
    <>
      {navLinks.map((navLink) => (
        <Button
          onClick={() => {
            if (navLink.href) {
              router.push(navLink.href(id));
            } else {
              setNavTitle(navLink.title);
            }
          }}
          title={navLink.title}
          key={navLink.title}
          className={`${
            (
              navLink.href
                ? pathname == navLink.href(id)
                : navTitle === navLink.title
            )
              ? "text-primary bg-[var(--dark-gray)]"
              : "text-white"
          } flex gap-2 w-full mb-1`}
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
                <span className="block whitespace-nowrap">{navLink.title}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      ))}
      <div className="h-[1px] bg-[var(--gray)] mx-1" />
      {session && !isUserProfile && (
        <button
          onClick={() => router.push(`/u/${session.user?.id}/dashboard`)}
          className="w-[45px] h-[45px] border-2 border-primary rounded-full cursor-pointer mt-auto overflow-hidden"
        >
          <img src={session.user?.image!} />
        </button>
      )}
    </>
  );
}
