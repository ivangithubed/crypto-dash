import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
          // Будь-який запит, що починається з /api, буде перенаправлено
          '/api': {
            target: 'https://api.coingecko.com/api/v3', // Адреса вашого локального бекенд-сервера
            changeOrigin: true, // Необхідно для віртуальних хостів
            rewrite: (path) => path.replace(/^\/api/, ''), // Видалити /api з шляху
          },
        },
    
  },
  build: {
    outDir: 'crypto-dash',
    // minify: false,
    // base: '/crypto-dash/'
    // assetsDir: 'files-of-pr'
    // sourcemap: true
  }
})

