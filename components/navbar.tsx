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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={handleToggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur border-b ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="container px-4 py-4">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/media"
              className="block py-2 text-foreground hover:text-primary"
            >
              Kyza Lab
            </Link>
            <div className="py-2">
              <p className="text-sm font-medium text-foreground/60 pb-2">
                Tools
              </p>
              {[
                {
                  href: "/tools/wallpaper-engine",
                  label: "Wallpaper Engine",
                  icon: "🖼️",
                },
                {
                  href: "/tools/hyper-realistic-video",
                  label: "Hyper Realistic",
                  icon: "🎥",
                },
                {
                  href: "",
                  label: "???????",
                  icon: "🎬",
                },
                {
                  href: "",
                  label: "???????",
                  icon: "🎨",
                },
                {
                  href: "",
                  label: "???????",
                  icon: "📹",
                },
                {
                  href: "",
                  label: "???????",
                  icon: "🎨",
                },
                {
                  href: "",
                  label: "???????",
                  icon: "📚",
                },
                {
                  href: "",
                  label: "???????",
                  icon: "👾",
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block py-2 pl-4 text-foreground hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <span>{tool.icon}</span>
                    {tool.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
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
                  Kyza Lab
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
                  <Link href="/tools/wallpaper-engine" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🖼️</span>
                      Wallpaper Engine
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/tools/hyper-realistic-video" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎥</span>
                      Hyper Realistic
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem disabled className="cursor-not-allowed">
                  <Link href="" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎬</span>
                      ???????
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem disabled className="cursor-not-allowed">
                  <Link href="" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎨</span>
                      ???????
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem disabled className="cursor-not-allowed">
                  <Link href="" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>📹</span>
                      ???????
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem disabled className="cursor-not-allowed">
                  <Link href="" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>🎨</span>
                      ???????
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem disabled className="cursor-not-allowed">
                  <Link href="" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>📚</span>
                      ???????
                    </span>
                  </Link>
                </MenubarItem>
                <MenubarItem disabled>
                  <Link href="" className="w-full">
                    <span className="flex items-center gap-2">
                      <span>👾</span>
                      ???????
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
