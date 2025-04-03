import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    host: '0.0.0.0', // Permite acesso de qualquer IP na rede
    port: 5173, // Define a porta do servidor local
  },
});
