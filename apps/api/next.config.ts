import { env } from "@repo/env";
import { config, withAnalyzer, withSentry } from "@repo/next-config";
import type { NextConfig } from "next";

const nextConfig = { ...config } as NextConfig;

if (env?.VERCEL) {
  Object.assign(nextConfig, withSentry(nextConfig as any));
}

if (env?.ANALYZE === "true") {
  Object.assign(nextConfig, withAnalyzer(nextConfig as any));
}

export default nextConfig;
