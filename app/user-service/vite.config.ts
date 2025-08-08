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