"use client";

import { FC, useEffect, useState } from "react";
import { useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useTheme } from "next-themes";
import { SunFilledIcon, MoonFilledIcon } from "./icons";
import { cn } from "@/lib/utils";

interface ThemeSwitchProps {
  className?: string;
  classNames?: {
    base?: string;
    wrapper?: string;
  };
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Always initialize useSwitch hook regardless of mounted state
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange: () => setTheme(theme === "light" ? "dark" : "light"),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder during SSR
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <Component
      {...getBaseProps({
        className: cn(
          "px-2 py-1.5 rounded-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 shadow-lg transition-all duration-300 hover:scale-105",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: cn(
            [
              "w-auto h-auto",
              "bg-transparent",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "text-slate-100",
              "transition-colors",
              "hover:text-slate-300",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {isSelected ? (
          <MoonFilledIcon size={20} />
        ) : (
          <SunFilledIcon size={20} />
        )}
      </div>
    </Component>
  );
};
