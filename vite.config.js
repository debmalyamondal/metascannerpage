import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path when served in development or production
  base: './',
  
  // Development server configuration
  server: {
    port: 5173,
    host: true, // Allow external access
    open: true, // Automatically open browser
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy-policy.html',
        dataProtection: 'data-protection.html',
        terms: 'terms-of-service.html',
        contributors: 'contributors.html'
      }
    }
  },
  
  // Static file handling
  publicDir: 'public',
  
  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  
  // CSS configuration
  css: {
    devSourcemap: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['lucide']
  }
}) 