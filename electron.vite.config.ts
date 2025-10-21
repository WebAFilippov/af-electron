// @ts-nocheck
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@app': resolve('src/main/app'),
        '@controllers': resolve('src/main/controllers'),
        '@database': resolve('src/main/database'),
        '@ipc': resolve('src/main/ipc'),
        '@lib': resolve('src/main/lib'),
        '@models': resolve('src/main/models'),
        '@repositories': resolve('src/main/repositories'),
        '@services': resolve('src/main/services'),
        '@shared': resolve('src/main/shared'),
        '@utils': resolve('src/main/utils')
      }
    },
    plugins: [externalizeDepsPlugin()],
    build: {
      reportCompressedSize: false,
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
    plugins: [externalizeDepsPlugin()],
    build: {
      reportCompressedSize: false
    }
  },
  renderer: {
    base: './',
    resolve: {
      alias: {
        '@app': resolve(__dirname, './src/renderer/src/app'),
        '@pages': resolve(__dirname, './src/renderer/src/pages'),
        '@widgets': resolve(__dirname, './src/renderer/src/widgets'),
        '@features': resolve(__dirname, './src/renderer/src/features'),
        '@entities': resolve(__dirname, './src/renderer/src/entities'),
        '@shared': resolve(__dirname, './src/renderer/src/shared')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: ['effector/babel-plugin']
        }
      }),
      tailwindcss()
    ],
    output: {
      assetFileNames: ['src/shared/assets/fonts/[name].[ext]']
    },
    build: {
      reportCompressedSize: false,
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
  }
})
