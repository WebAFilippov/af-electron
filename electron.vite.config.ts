import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/renderer/src'),
        '@app': resolve(__dirname, './src/renderer/src/app'),
        '@shared': resolve(__dirname, './src/renderer/src/shared'),
      }
    },
    plugins: [react()],
    define: {
      'process.env': process.env
    }
  }
})
