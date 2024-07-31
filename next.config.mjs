import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["notify-back.r-link.io"],
    // domains: ["notify-back.r-link.io", "192.168.132.150:8000"],
  },
};

export default withNextIntl(nextConfig);
