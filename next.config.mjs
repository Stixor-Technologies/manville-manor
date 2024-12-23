/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "ewswk8og44wgowo8kogkocs4.stixor.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
