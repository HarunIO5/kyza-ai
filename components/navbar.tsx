"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 transition-transform hover:scale-105">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <p className="font-bold text-xl tracking-tight">KYZA</p>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <Menubar className="hidden lg:flex border-none gap-6 bg-transparent">
            {siteConfig.navItems.map((item) => (
              <MenubarMenu key={item.href}>
                <Link href={item.href}>
                  <MenubarTrigger className="cursor-pointer font-medium transition-colors hover:text-primary">
                    {item.label}
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
            ))}
            <MenubarMenu>
              <Link href="/media">
                <MenubarTrigger className="cursor-pointer font-medium transition-colors hover:text-primary">
                  Media
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <Menubar className="hidden lg:flex border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer font-medium transition-colors hover:text-primary">
                Tools
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/tools/text-to-image" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎨</span>
                      Text to Image
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/text-to-video" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>📹</span>
                      Text to Video
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/text-to-video?style=ghibli" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎬</span>
                      Ghibli
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/text-to-video?style=hyperrealistic" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎥</span>
                      Hyper Realistic Video
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/text-to-video?style=art" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎨</span>
                      Generative Art
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/text-to-video?style=manga" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>📚</span>
                      Anime/Manga
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/text-to-video?style=pixel" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>👾</span>
                      Pixel/8-Bit
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/wallpaper-engine" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🖼️</span>
                      Wallpaper Engine
                    </span>
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
};
