// Configuration for bundling the options page

import { resolve } from 'path'
import { defineConfig } from 'vite'

// See https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [],

  // Code that is copied directly to the extension directory
  publicDir: 'static',
  root: resolve('src'),

  build: {
    lib: {
      entry: resolve(__dirname, 'src/background.ts'),
      fileName: 'background',
      formats: ['es']
    },
    assetsDir: '.',
    outDir: '../extension',
    emptyOutDir: true,
    target: 'chrome89',
    sourcemap: true,
    minify: false
  }
})
