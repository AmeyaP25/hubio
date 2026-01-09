/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  reactStrictMode: false,
  swcMinify: true,
  
  // Faster image loading
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    unoptimized: true, // Skip optimization for faster loads
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  poweredByHeader: false,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Aggressive package optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion', 
      '@radix-ui/react-avatar', 
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
      '@supabase/supabase-js',
      'react-icons',
    ],
  },
  
  productionBrowserSourceMaps: false,
  compress: true,
  
  // Faster module resolution
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
=======
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Optimize performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  poweredByHeader: false,
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
}

module.exports = nextConfig
