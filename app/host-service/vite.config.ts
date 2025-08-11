import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_service',
      remotes: {
        userService: 'http://localhost:8081/assets/userService.js',
        authService: 'http://localhost:8082/assets/authService.js',
        notiService: 'http://localhost:8083/assets/notiService.js',
      },
      shared: {
        react: {
          requiredVersion: '^19.1.0',
        },
        'react-dom': {
          requiredVersion: '^19.1.0',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
  },
  server: {
    port: 8080,
    open: true,
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
});