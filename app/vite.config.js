import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GSFS Virtual — portal de review (Fase 1)
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: true,
    },
});
