export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "나의 할일",
      href: "/todos",
    },
    {
      label: "편입 합격 수기",
      href: "/passing-essay",
    },
    {
      label: "편입 불합격 수기",
      href: "/fail-essay",
    },
    {
      label: "대학교 입학처",
      href: "/admissions-office",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "내 정보",
      href: "/profile",
    },
    {
      label: "나의 할 일",
      href: "/todos",
    },
    {
      label: "편입 합격 수기",
      href: "/passing-essay",
    },
    {
      label: "편입 불합격 수기",
      href: "/fail-essay",
    },
    {
      label: "대학교 입학처",
      href: "/admissions-office",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
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
