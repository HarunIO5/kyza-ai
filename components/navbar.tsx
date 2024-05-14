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
	DropdownMenu,
	DropdownSection
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
        		  >
					<DropdownSection showDivider>
        		    	<DropdownItem
        		    	  key="text_to_video"
        		    	  startContent={'📹'}
						  href="/tools/text-to-video"
        		    	>
        		    		Text-to-Video
        		    	</DropdownItem>
        		    	<DropdownItem
        		    	  key="wallpaper_engine"
        		    	  startContent={'🖼️'}
						  href="/tools/wallpaper-engine"
        		    	>
        		    	  Wallpaper Engine
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="logo_generator"
        		    	  startContent={'💫'}
						  href="/tools/brand-logo-generator"
        		    	>
        		    	  AI Logo Generator
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="prompt_detector"
        		    	  startContent={'🕵️'}
						  href="/tools/prompt-detector-discover-any-prompt"
        		    	>
        		    	  Prompt Detector
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="movie_generator"
        		    	  startContent={'📽️'}
						  href="/tools/a-i-movie-generator"
        		    	>
        		    	  AI Movie Generator
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="auto_caption"
        		    	  startContent={'✍️'}
						  href="/tools/video-caption-online"
        		    	>
        		    	  Auto Captioning 
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="generative_art"
        		    	  startContent={'🎨'}
						  href="/tools/generative-art-maker"
        		    	>
        		    	  Generative Art
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="interior_ai"
        		    	  startContent={'🏡'}
						  href="/tools/kyza-interior-ai"
        		    	>
        		    	  AI Interior Designer
        		    	</DropdownItem>
						<DropdownItem
        		    	  key="interior_ai"
        		    	  startContent={'🖌️'}
						  href="/tools/qr-code-art-generator "
        		    	>
        		    	  QR Code Art Maker
        		    	</DropdownItem>
					</DropdownSection>
					<DropdownItem
        		    	  key="all_tools"
						  href="/tools"
        		    	>
        		    	  All Tools
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
							href={'/tools/text-to-video'}
							size="lg"
						>
							📹 Text-to-Video
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`wallpaper_engine`}>
						<Link
							color={"foreground"}
						  	href="/tools/wallpaper-engine"
							size="lg"
							
						>
							🖼️ Wallpaper Engine
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`logo_generator`}>
						<Link
							color={"foreground"}
							href="/tools/brand-logo-generator"
							size="lg"
						>
							💫 AI Logo Generator
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`prompt_detector`}>
						<Link
							color={"foreground"}
							href="/tools/prompt-detector-discover-any-prompt"
							size="lg"
						>
							🕵️ Prompt Detector
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`movie_generator`}>
						<Link
							color={"foreground"}
							href="/tools/a-i-movie-generator"
							size="lg"
						>
							📽️ AI Movie Generator
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`auto_caption`}>
						<Link
							color={"foreground"}
							href="/tools/video-caption-online"
							size="lg"
						>
							✍️ Auto Captioning 
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`auto_caption`}>
						<Link
							color={"foreground"}
							href="/tools/generative-art-maker"
							size="lg"
						>
							🎨 Generative Art
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`interior_ai`}>
						<Link
							color={"foreground"}
							href="/tools/kyza-interior-ai"
							size="lg"
						>
							🏡 AI Interior Designer
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem key={`interior_ai`}>
						<Link
							color={"foreground"}
							href="/tools/qr-code-art-generator"
							size="lg"
						>
							🖌️ QR Code Art Maker
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
