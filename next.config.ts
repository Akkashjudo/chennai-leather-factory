import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF encoding stalled sharp on the local server; WebP is fast and widely supported.
    formats: ["image/webp"],
    qualities: [75, 85],
  },
  poweredByHeader: false,
};

export default nextConfig;
