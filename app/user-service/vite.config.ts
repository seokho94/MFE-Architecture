import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'user_service',
      filename: 'userService.js',
      exposes: {
        './UserServiceComponent': './src/App.tsx',
        // './routes': './src/routes/routes.tsx',
      },
      shared: {
        react: {
          requiredVersion: '^19.1.0', // package.json에 맞게 수정
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  preview: {
    port: 8081,              // 필요 포트
    cors: true,              // Host에서 원격 모듈 로드 시 CORS 허용
    headers: {
      // 캐시 완전 비활성화
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      // 원격 로드 호환성
      'Access-Control-Allow-Origin': '*',
    },
  },
  server: {
    port: 8081,
    open: true,
  },
  build: {
    outDir: 'dist',
    target: 'esnext', // 최신 브라우저 대상
    // assetsDir: '', // 필요 시 설정
    // rollupOptions: {}, // 고급 빌드 설정 시 사용
  },
  // base: '/', // publicPath 관련, 필요 시 설정
});