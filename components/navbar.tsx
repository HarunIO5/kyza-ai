'use client'

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { Video, Construction, ChevronDown } from 'lucide-react';
import {
	DropdownItem, 
	DropdownTrigger, 
	Dropdown, 
	DropdownMenu
} from '@nextui-org/react' 

import { Logo } from "@/components/icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import UserNav from "@/components/user-nav";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
	const [isMounted, setIsMounted] = useState(false);

	const pathname = usePathname();

	const { data: session, status } = useSession()

	useEffect(() => {
		if (isMenuOpen) {
		  setIsMenuOpen(false);
		}
	  }, [pathname]);

	useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
       return null;
    }

	const icons = {
		Video: <Video  size={30} />,
		Construction: <Construction size={30} />,
		ChevronDown: <ChevronDown size={16} />
	};

	let baseUrl = ''

    if (process.env.NODE_ENV === 'production'){
      baseUrl = 'https://kyza.ai'
      } else {
      baseUrl = 'http://localhost:3000'
    }

	return (
		<NextUINavbar maxWidth="xl" position="sticky" className="border-b border-zinc-800" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">KYZA</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<ul className="hidden lg:flex gap-4 justify-start ml-2" key={'menu'}>
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				<Dropdown>
        		  <NavbarItem>
        		    <DropdownTrigger>
        		      <Button
        		        disableRipple
        		        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
						endContent={icons.ChevronDown}
        		        radius="sm"
        		        variant="light"
        		      >
        		        Tools
        		      </Button>
        		    </DropdownTrigger>
        		  </NavbarItem>
        		  <DropdownMenu
        		    aria-label="Kyza Generations"
        		    className="w-[340px]"
        		    itemClasses={{
        		      base: "gap-4",
        		    }}
					disabledKeys={["wallpaper_engine"]}
        		  >
        		    <DropdownItem
        		      key="text_to_video"
        		      startContent={icons.Video}
					  href="/text-to-video"
        		    >
        		      Text-to-Video
        		    </DropdownItem>
        		    <DropdownItem
        		      key="wallpaper_engine"
        		      startContent={icons.Construction}
        		    >
        		      Wallpaper Engine - Coming Soon
        		    </DropdownItem>
					<DropdownItem
        		      key="wallpaper_engine"
        		      startContent={icons.Construction}
        		    >
        		      Spotify Canvas Maker
        		    </DropdownItem>
					<DropdownItem
        		      key="wallpaper_engine"
        		      startContent={icons.Construction}
        		    >
        		      Iphone Screensavers
        		    </DropdownItem>
					<DropdownItem
        		      key="wallpaper_engine"
        		      startContent={icons.Construction}
        		    >
        		      AI Movie Generator
        		    </DropdownItem>
					<DropdownItem
        		      key="wallpaper_engine"
        		      startContent={icons.Construction}
        		    >
        		      Macbook Background Generator
        		    </DropdownItem>
        		  </DropdownMenu>
        		</Dropdown>
				<NavbarItem className="flex h-full items-center">
          			<ThemeSwitch />
        		</NavbarItem>
				{session ? (
					<UserNav session={session} />	
				) : (
					<NavbarItem key={'login'}>
						<NextLink href={'/login'}>
							<Button color="secondary">
								Login
							</Button>
						</NextLink>
					</NavbarItem>
				)}	
								
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          		<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={"foreground"}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
					<NavbarMenuItem key={`text_to_video`}>
						<Link
							color={"foreground"}
							href={'/text-to-video'}
							size="lg"
						>
							Text-to-Video
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`wallpaper_engine`}>
						<Link
							color={"foreground"}
							href={'/'}
							size="lg"
							isDisabled
						>
							Wallpaper Engine - Coming Soon
						</Link>
					</NavbarMenuItem>
					{session ? (
						<>
							<NavbarMenuItem key={`library`}>
								<Link
									color={"primary"}
									href={'/library'}
									size="lg"
								>
									Library
								</Link>
							</NavbarMenuItem>
							<NavbarMenuItem key={`settings`}>
								<Link
									color={"foreground"}
									href={'/settings'}
									size="lg"
								>
									Settings
								</Link>
							</NavbarMenuItem>
							<NavbarMenuItem key={`logout`}>
								<Link
									color={"danger"}
									href={''}
									onClick={() => signOut({callbackUrl: `${baseUrl}`})}
									size="lg"
								>
									Logout
								</Link>
							</NavbarMenuItem>
						</>
					) : (
						<NavbarMenuItem key={`logout`}>
						<Link
							color={"secondary"}
							href={'/login'}
							size="lg"
						>
							Login
						</Link>
					</NavbarMenuItem>
					)}
					
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
