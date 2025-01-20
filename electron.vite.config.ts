// @ts-nocheck
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin , bytecodePlugin} from 'electron-vite'
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
        '@main/shared': path.resolve(__dirname, './src/main/shared'),
        '@shared': path.resolve(__dirname, './src/shared')
      }
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    base: './',
    plugins: [react()],
    define: {
      'process.env': process.env
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
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
