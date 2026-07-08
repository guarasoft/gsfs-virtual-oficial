import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build single-file do viewer do bloco 3D (Fase 4) — um único HTML
// auto-contido (JS/CSS inline) para envio ao cliente via WhatsApp.
// Uso: npm run build:viewer → dist-viewer/viewer.html
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-viewer',
    rollupOptions: {
      input: 'viewer.html',
    },
  },
})
