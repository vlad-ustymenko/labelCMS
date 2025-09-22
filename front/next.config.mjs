/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
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

  async headers() {
    return [
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|gif|svg|webm|mp4|woff2|css|js)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
