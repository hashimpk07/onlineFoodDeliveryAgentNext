/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
    serverSourceMaps: true,
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/default",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendServer =
      process.env.NEXT_PUBLIC_BACKEND_SERVER ??
      "https://sandbox.4ulogistic.com/api";
    return [
      // {
      //   source: "/api/:path*",
      //   destination: `${backendServer}/:path*`, // Proxy API to Laravel backend
      // },
      {
        source: "/api/public/:path*",
        destination: `${backendServer}/public/:path*`, // Proxy API to Laravel backend
      },
      {
        source: "/api/client/:path*",
        destination: `${backendServer}/client/:path*`,
      },
    ];
  },
};

export default nextConfig;
