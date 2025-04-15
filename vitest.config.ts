/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
 plugins: [react()],
 test: {
   environment: 'jsdom',
   globals: true,
   setupFiles: ['./tests/setupTest'],
   coverage: {
     reporter: ['text', 'json', 'html'],
   },
   include: ["./tests/**/*.test.{js,jsx,ts,tsx}"],
 },
 resolve: {
   alias: {
     '@': path.resolve(__dirname, './src'),
     // '@features': path.resolve(__dirname, './src/redux/features'),
     // '@hooks': path.resolve(__dirname, './src/hooks'),
     // '@store': path.resolve(__dirname, './src/redux/store'),
   },
 },
});
