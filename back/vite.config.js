import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'public/dist',
    rollupOptions: {
      input: 'public/src/js/project-form.ts',
      output: {
        entryFileNames: 'js/[name].js',
        format: 'iife'
      }
    }
  },
  publicDir: false
})