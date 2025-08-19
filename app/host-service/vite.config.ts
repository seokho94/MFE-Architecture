import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_service',
      filename: 'hostService.js',
      exposes: {
        './Store': './src/store/Store.ts',
        './CommonComponents': './src/components/common/index.ts',
        './ArboristTree': './src/components/common/ArboristTree.tsx',
        './DataGrid': './src/components/common/DataGrid.tsx',
      },
      remotes: {
        // user_service: 'http://localhost:8081/userService.js',
        // auth_service: 'http://localhost:8082/authService.js',
        // noti_service: 'http://localhost:8083/notiService.js',
        user_service: {
          type: 'module',                // <-- 중요
          name: 'user_service',          // Remote의 name 과 100% 일치
          entry: 'http://localhost:8081/userService.js',
        },
        auth_service: {
          type: 'module',                // <-- 중요
          name: 'auth_service',          // Remote의 name 과 100% 일치
          entry: 'http://localhost:8082/authService.js',
        },
        noti_service: {
          type: 'module',                // <-- 중요
          name: 'noti_service',          // Remote의 name 과 100% 일치
          entry: 'http://localhost:8083/notiService.js',
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
  base: 'http://localhost:8080',
});