"use client";

import { Device, useNavContext } from "@/contexts";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { mainNav, profileNav } from "@/data/navigation";
import { usePathname } from "next/navigation";
import LoadingNav from "../effects/LoadingNav";

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

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-3">
        <LoadingNav extend={extend} />
        <LoadingNav extend={extend} />
        <LoadingNav extend={extend} />
      </div>
    );
  }

  const isUserPage = pathname.startsWith("/u");

  const navLinks = isUserPage
    ? profileNav.filter((link) => isOwner || link.type !== "private")
    : mainNav;

  return (
    <>
      <div className="flex flex-col gap-2">
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
            className={"flex items-center cursor-pointer group"}
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
              } rounded-full w-8 h-8 flex items-center justify-center`}
            >
              <navLink.icon width={20} />
            </div>
            <AnimatePresence>
              {(device == "mobile" || device == "desktop" || extend) && (
                <>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 10 }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <span
                      className={`${
                        (
                          navLink.href
                            ? pathname == navLink.href(id)
                            : navTitle === navLink.title
                        )
                          ? "text-white"
                          : "text-white/35 group-hover:text-primary scale-90 group-hover:scale-100 origin-left transition-transform duration-200"
                      } block whitespace-nowrap`}
                    >
                      {navLink.title}
                    </span>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      {!isUserPage && <div className="h-[1px] bg-[var(--gray)] mx-1" />}
      {session && !isUserPage && (
        <button
          onClick={() => router.push(`/u/${session.user?.id}/dashboard`)}
          className="w-[45px] h-[45px] border-2 border-primary rounded-full cursor-pointer mt-auto overflow-hidden"
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
