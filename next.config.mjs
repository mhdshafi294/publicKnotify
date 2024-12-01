import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["notify-back.r-link.io"],
    domains: ["145.223.116.215"],
    domains: ["192.168.132.43"], //! to delete
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply these headers to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin", // Adjust this based on your requirements
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
