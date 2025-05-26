/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // заміни на реальний домен з STRAPI_BASE_URL
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co", // заміни на реальний домен з STRAPI_BASE_URL
      },
    ],
  },
};

export default nextConfig;
