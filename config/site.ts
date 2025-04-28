export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KYZA",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Articles",
      href: "/blog",
    },
    {
      label: "GitBook",
      href: "https://kyza-ai.gitbook.io/kyza-ai",
    },
    {
      label: "Community (X)",
      href: "https://x.com/kyza_ai",
    },
    {
      label: "GitHub",
      href: "https://github.com/HarunIO5/kyza-ai",
    },
  ],
  navMenuItems: [
    {
      label: "Articles",
      href: "/blog",
    },
    {
      label: "GitBook",
      href: "https://docs.kyza.ai",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
