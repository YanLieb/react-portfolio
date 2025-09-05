import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    outDir: 'public/dist',
    rollupOptions: {
      input: {
        'project-form': 'public/src/js/project-form.ts',
        'style': 'public/src/css/style.css'
      },
      output: {
        entryFileNames: 'js/[name].js',
        assetFileNames: 'css/[name].css',
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
  publicDir: false
})