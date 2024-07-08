type link = {
  id: number;
  label: string;
  href: string;
};

export const mainNavLinks: link[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Requests",
    href: "/requests",
  },
  {
    label: "Statistics",
    href: "/statistics",
  },
  {
    label: "Favorite",
    href: "/favorite",
  },
  {
    label: "New Publish",
    href: "/publish",
  },
].map((link, index) => ({ ...link, id: index + 1 }));
