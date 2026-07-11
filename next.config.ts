import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfjs-dist", "mammoth"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: [],
  },
  // Force-include pdfjs-dist worker files in the Vercel serverless bundle.
  // Vercel's output file tracing misses dynamically-imported worker files,
  // so we explicitly include them here.
  outputFileTracingIncludes: {
    "/api/roast": ["./node_modules/pdfjs-dist/**/*"],
  },
};

export default nextConfig;
