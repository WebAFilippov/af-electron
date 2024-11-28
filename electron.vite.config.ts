import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import path from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/main'),
        '@ui': path.resolve(__dirname, './src/main/ui'),
        '@ipc': path.resolve(__dirname, './src/main/ipc'),
        '@utils': path.resolve(__dirname, './src/main/utils'),
        '@database': path.resolve(__dirname, './src/main/database'),
        '@models': path.resolve(__dirname, './src/main/models'),
        '@services': path.resolve(__dirname, './src/main/services'),
        '@repositories': path.resolve(__dirname, './src/main/repositories'),
        '@shared': path.resolve(__dirname, './src/main/shared')
      }
    },
    build: {
      minify: 'esbuild'
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react()],
    define: {
      'process.env': process.env
    },
    build: {
      minify: 'esbuild'
    },
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, './src/renderer/src/app'),
        '@pages': path.resolve(__dirname, './src/renderer/src/pages'),
        '@widgets': path.resolve(__dirname, './src/renderer/src/widgets'),
        '@features': path.resolve(__dirname, './src/renderer/src/features'),
        '@entities': path.resolve(__dirname, './src/renderer/src/entities'),
        '@shared': path.resolve(__dirname, './src/renderer/src/shared')
      }
    }
  }
})
