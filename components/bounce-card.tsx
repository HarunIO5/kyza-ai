'use client'

import { ReactNode } from "react";
import { motion } from "framer-motion";

export const BounceCard = ({
    className,
    children,
  }: {
    className: string;
    children: ReactNode;
  }) => {
    return (
      <motion.div
        whileHover={{ scale: 0.95, rotate: "-1deg" }}
        className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-900 p-8 ${className}`}
      >
        {children}
      </motion.div>
    );
  }