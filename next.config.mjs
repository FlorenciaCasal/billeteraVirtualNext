/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Habilita el modo estricto de React
    swcMinify: true,  // Minificación del JS en producción
    experimental: {
        appDir: true, // Habilitar App Router
    },
};

export default nextConfig;
