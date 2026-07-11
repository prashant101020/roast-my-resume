import type { NextConfig } from "next";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // This is the robust way to find the worker file
      const workerFilePath = require.resolve("pdfjs-dist/legacy/build/pdf.worker.min.mjs");

      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: workerFilePath,
              // Copy it to the server build directory
              to: path.resolve(__dirname, ".next/server/"),
            },
          ],
        })
      );
    }
    return config;
  },
};

export default nextConfig;

