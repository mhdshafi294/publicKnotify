/**
 * Configuration object for the site.
 *
 * @property {string} name - The name of the site.
 * @property {string} description - A brief description of the site.
 * @property {string} baseUrl - The base URL of the site.
 * @property {object} apiEndpoints - The API endpoints used by the site.
 * @property {object} socialMedia - Social media links.
 * @property {object} contact - Contact information.
 * @property {object} features - Feature toggles.
 * @property {object} seo - SEO metadata.
 * @property {object} theme - Theme settings.
 *
 * @example
 * ```ts
 * import { siteConfig } from '@/config/site';
 *
 * console.log(siteConfig.name); // Output: Knotify
 * console.log(siteConfig.description); // Output: Share your podcast with the world
 * ```
 */
export const siteConfig = {
  /**
   * The name of the site.
   */
  name: "Knotify",

  /**
   * A brief description of the site.
   */
  description: "Share your podcast with the world",

  /**
   * The base URL of the site.
   */
  baseUrl: "https://www.knotify.com",

  /**
   * The API endpoints used by the site.
   */
  apiEndpoints: {
    getPodcasts: "/api/podcasts",
    getUsers: "/api/users",
    submitContactForm: "/api/contact",
  },

  /**
   * Social media links.
   */
  socialMedia: {
    twitter: "https://twitter.com/knotify",
    facebook: "https://www.facebook.com/knotify",
    instagram: "https://www.instagram.com/knotify",
    linkedIn: "https://www.linkedin.com/company/knotify",
  },

  /**
   * Contact information.
   */
  contact: {
    supportEmail: "support@knotify.com",
    contactFormUrl: "https://www.knotify.com/contact",
  },

  /**
   * Feature toggles.
   */
  features: {
    enableComments: true,
    enableSharing: true,
    enableNotifications: true,
  },

  /**
   * SEO metadata.
   */
  seo: {
    defaultTitle: "Knotify - Share your podcast with the world",
    defaultDescription:
      "Knotify is the best platform to share and discover podcasts.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.knotify.com",
      siteName: "Knotify",
      images: [
        {
          url: "https://www.knotify.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Knotify - Share your podcast with the world",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@knotify",
      creator: "@knotify",
    },
  },

  /**
   * Theme settings.
   */
  theme: {
    defaultTheme: "dark",
    availableThemes: ["dark"],
  },
};
