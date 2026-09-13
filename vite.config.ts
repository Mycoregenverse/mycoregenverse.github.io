import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// GitHub Pages serve o site no subcaminho /mycoregenverse/. O base é aplicado
// só quando GITHUB_PAGES=true (definido no workflow de deploy); localmente e na
// Vercel o site continua servido a partir da raiz.
const base = process.env.GITHUB_PAGES === 'true' ? '/mycoregenverse/' : '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
