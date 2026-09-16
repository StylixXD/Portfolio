import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap", "lenis"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
