import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/voxelnorus.github.io",
  images: { unoptimized: true },
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
