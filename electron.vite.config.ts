import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import path from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@handlers': path.resolve(__dirname, './src/main/handlers'),
        '@libs': path.resolve(__dirname, './src/main/libs'),
        '@types_app': path.resolve(__dirname, './src/main/types_app'),
        '@utils': path.resolve(__dirname, './src/main/utils')
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
