import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pokeapi.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://pokeapi.co",
      },
    ],
  },
};

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

export default withPWA(nextConfig);
