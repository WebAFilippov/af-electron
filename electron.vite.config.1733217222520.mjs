// electron.vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import path from "path";
var __electron_vite_injected_dirname = "C:\\Users\\AlexWebDev\\Desktop\\electron_application";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__electron_vite_injected_dirname, "./src/main"),
        "@ui": path.resolve(__electron_vite_injected_dirname, "./src/main/ui"),
        "@ipc": path.resolve(__electron_vite_injected_dirname, "./src/main/ipc"),
        "@utils": path.resolve(__electron_vite_injected_dirname, "./src/main/utils"),
        "@database": path.resolve(__electron_vite_injected_dirname, "./src/main/database"),
        "@models": path.resolve(__electron_vite_injected_dirname, "./src/main/models"),
        "@services": path.resolve(__electron_vite_injected_dirname, "./src/main/services"),
        "@repositories": path.resolve(__electron_vite_injected_dirname, "./src/main/repositories"),
        "@main/shared": path.resolve(__electron_vite_injected_dirname, "./src/main/shared"),
        "@shared": path.resolve(__electron_vite_injected_dirname, "./src/shared")
      }
    },
    build: {
      minify: "esbuild"
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react()],
    define: {
      "process.env": process.env
    },
    build: {
      minify: "esbuild"
    },
    resolve: {
      alias: {
        "@app": path.resolve(__electron_vite_injected_dirname, "./src/renderer/src/app"),
        "@pages": path.resolve(__electron_vite_injected_dirname, "./src/renderer/src/pages"),
        "@widgets": path.resolve(__electron_vite_injected_dirname, "./src/renderer/src/widgets"),
        "@features": path.resolve(__electron_vite_injected_dirname, "./src/renderer/src/features"),
        "@entities": path.resolve(__electron_vite_injected_dirname, "./src/renderer/src/entities"),
        "@shared": path.resolve(__electron_vite_injected_dirname, "./src/renderer/src/shared")
      }
    }
  }
});
export {
  electron_vite_config_default as default
};
