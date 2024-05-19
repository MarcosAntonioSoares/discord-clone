/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push({
      "utf-8-validate": "cammonjs utf-8-validate",
      bufferutil: "cammonjs bufferutil",
    });
    isServer && (config.externals = [...config.externals, "socket.io-client"]);
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
