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
        hostname: "b0gssw4oowcgogsgs00kww8w.stixor.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
