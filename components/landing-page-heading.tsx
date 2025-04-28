"use client";

import { title, subtitle } from "@/components/primitives";
import { motion } from "framer-motion";
import SearchBar from "./search";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LandingPageHeading() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative w-full py-24",
        theme === "light" && "bg-gradient-to-b from-slate-100 to-white",
        theme === "dark" && "bg-gradient-to-b from-[#020617] to-black"
      )}
    >
      {/* Top Feature Bar */}
      <div className="absolute top-4 left-0 right-0">
        <div
          className={cn(
            "flex items-center justify-center gap-2 md:gap-6 backdrop-blur-md px-3 py-2 md:p-4 rounded-full w-fit mx-auto border shadow-lg text-sm md:text-base",
            theme === "light" && "bg-white/40 border-slate-200/50",
            theme === "dark" && "bg-slate-800/40 border-slate-700/50"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-medium hover:text-green-300 transition-colors whitespace-nowrap cursor-default">
              Live Generation
            </span>
          </div>
          <span className="text-slate-500 font-light">|</span>
          <span className="text-purple-400 font-medium hover:text-purple-300 transition-colors whitespace-nowrap cursor-default">
            4K Quality
          </span>
          <span className="text-slate-500 font-light">|</span>
          <span className="text-blue-400 font-medium hover:text-blue-300 transition-colors whitespace-nowrap cursor-default">
            Real-time Processing
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-5 max-w-3xl mx-auto text-center z-10 pt-16">
        <h1 className={title()}>Search For&nbsp;</h1>
        <h1
          className={`${title()} inline-flex animate-text-gradient bg-gradient-to-r from-[#ac4cf5] via-[#53d1ff] to-[#dd61ff] bg-[200%_auto] bg-clip-text italic text-transparent`}
        >
          Beautiful&nbsp;
        </h1>
        <br />
        <h1 className={title()}>AI Videos</h1>
        <h2 className={subtitle({ class: "mt-4 mb-8" })}>
          Search and view the latest videos from the latest models
        </h2>
        <SearchBar />
      </div>

      <div className="flex justify-center items-center pt-12">
        <div
          className={cn(
            "flex items-center justify-center gap-2 md:gap-6 backdrop-blur-md px-3 py-2 md:p-4 rounded-full w-fit mx-auto border shadow-lg text-sm md:text-base",
            theme === "light" && "bg-white/40 border-slate-200/50",
            theme === "dark" && "bg-slate-800/40 border-slate-700/50"
          )}
        >
          <Link
            href="https://dexscreener.com/solana/3pbsdfpwmndgchmap7qlxygg5s7rwyjcckskdjdxvx6h"
            target="_blank"
          >
            <span className="text-purple-400 font-medium hover:text-purple-300 transition-colors whitespace-nowrap cursor-default">
              DEXSCREENER
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
