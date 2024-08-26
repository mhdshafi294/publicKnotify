type Link = {
  id: number;
  label: string;
  href: string;
};

/**
 * Main navigation links for the application.
 *
 * This array contains objects representing the main navigation links for the application.
 * Each object has an `id`, `label`, and `href` property.
 *
 * @example
 * ```typescript
 * console.log(mainNavLinks);
 * // [
 * //   { id: 1, label: "Home", href: "/" },
 * //   { id: 2, label: "Requests", href: "/requests" },
 * //   { id: 3, label: "Statistics", href: "/statistics" },
 * //   { id: 4, label: "Favorite", href: "/favorite" },
 * //   { id: 5, label: "Add Podcast", href: "/publish" }
 * // ]
 * ```
 */
export const mainNavLinks: Link[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/shows",
  },
  {
    label: "Requests",
    href: "/requests",
  },
  {
    label: "Statistics",
    href: "/shows/1/analytics",
  },
  {
    label: "Favorite",
    href: "/favorite",
  },
  {
    label: "Add Podcast",
    href: "/shows/1/publish",
  },
].map((link, index) => ({ ...link, id: index + 1 }));
