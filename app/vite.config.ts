import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GSFS Virtual — portal de review
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    fs: {
      // permite importar tokens/fontes da pasta irmã brand-assets/
      // ('..' é resolvido relativo à raiz do projeto = c:\Projetos\son)
      allow: ['..'],
    },
  },
})
