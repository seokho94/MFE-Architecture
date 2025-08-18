import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'noti_service',
      filename: 'notiService.js',
      exposes: {
        './NotiServiceComponent': './src/App.tsx',
        // './routes': './src/routes/routes.tsx',
      },
      remotes: {
        host_service: {
          type: 'module',                // <-- 중요
          name: 'host_service',          // Remote의 name 과 100% 일치
          entry: 'http://localhost:8080/hostService.js',
        },
      },
      shared: {
        react:        { singleton: true, strictVersion: true, requiredVersion: '19.1.1' },
        'react-dom':  { singleton: true, strictVersion: true, requiredVersion: '19.1.1' },
        zustand:      { singleton: true, strictVersion: true },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    port: 8083,
    origin: 'http://localhost:8083',
    open: true,
  },
  build: {
    outDir: 'dist',
    target: 'esnext', // 최신 브라우저 대상
    // assetsDir: '', // 필요 시 설정
    // rollupOptions: {}, // 고급 빌드 설정 시 사용
  },
  base: 'http://localhost:8083',
});