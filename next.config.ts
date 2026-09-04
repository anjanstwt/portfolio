import type { NextConfig } from "next";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
    turbopack: {
        root: projectRoot,
    },
    outputFileTracingRoot: projectRoot,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.icons8.com",
            },
            {
                protocol: "https",
                hostname: "cdn.simpleicons.org",
            },
        ],
    },
};

export default nextConfig;
