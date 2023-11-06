/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "github.com",
      "randomuser.me",
      "utfs.io",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
