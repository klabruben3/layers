"use client";

import { ChevronDown, SearchCode, SearchIcon, UserSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/contexts";
type Search = "components" | "people";

export default function Search({ className }: { className?: string }) {
  const searchQueries: Search[] = ["components", "people"];
  const [searchQuery, setSearchQuery] = useState<Search>("components");
  const [searchState, setSearchState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const device = useMediaQuery();

  useEffect(() => {
    const input = inputRef.current;
    input?.focus();
  }, [searchQuery]);

  return (
    <div
      className={`${className} relative rounded-border flex bg-background px-global py-1.5 gap-global before:content-[''] before:pointer-events-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-white/30 before:rounded-border before:transition-opacity before:opacity-0 before:duration-400 ${device == "desktop" ? "hover:before:opacity-100 focus-within:before:opacity-100" : null}`}
    >
      <button
        className="flex gap-[2px] items-center cursor-pointer group"
        onClick={() => setSearchState(!searchState)}
      >
        <SearchIcon width={16} className="text-white" />
        <ChevronDown
          width={16}
          className="text-white group-hover:translate-y-[2.5px] group-hover:text-primary group-focus:translate-y-[2.5px] group-focus:text-primary transition-transform duration-200"
        />
      </button>
      <input
        id={searchQuery}
        ref={inputRef}
        placeholder={`Search ${searchQuery}...`}
        className="focus:outline-none flex-1"
      />

      {searchState && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 10,
            duration: 0.5,
          }}
          id="search-toggle"
          className="z-10 border-2 border-[var(--gray)] rounded-border flex flex-col overflow-hidden bg-foreground py-2 absolute top-[calc(100%+var(--global-spacing))]"
        >
          {searchQueries.map((search) => (
            <button
              key={search}
              className={`px-2 flex gap-[5px] capitalize cursor-pointer hover:bg-white/10 transition-[background-color,color] duration-200 ${
                search == searchQuery ? "text-primary" : "text-white"
              }`}
              onClick={() => {
                setSearchQuery(search);
                setSearchState(!searchState);
              }}
            >
              {search == "people" ? (
                <UserSearch
                  width={16}
                  className={`${
                    search == searchQuery ? "text-primary" : "text-white"
                  }`}
                />
              ) : (
                <SearchCode
                  width={16}
                  className={`${
                    search == searchQuery ? "text-primary" : "text-white"
                  }`}
                />
              )}
              {search}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
