import type { NextConfig } from "next";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
    turbopack: {
        root: projectRoot,
    },
    outputFileTracingRoot: projectRoot,
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/test",
            },
        ];
    },
};

export default nextConfig;
