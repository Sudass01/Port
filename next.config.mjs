/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // O lint não derruba o deploy. Para checar o código, rode `npm run lint`
  // localmente (ou troque para false se quiser lint obrigatório no build).
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
};

export default nextConfig;
