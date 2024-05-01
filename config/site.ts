export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "KYZA",
	description: "Visualise The Best AI Video & Image Generations",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    	{
    	  label: "Blogs",
    	  href: "/blog",
    	}
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
    	{
    	  label: "Blogs",
    	  href: "/blog",
    	}
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
