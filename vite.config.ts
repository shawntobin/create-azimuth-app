import wasm from "vite-plugin-wasm";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import { comlink } from "vite-plugin-comlink";
import svgr from "@svgr/rollup";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [react(), wasm(), comlink(), svgr()],
  optimizeDeps: {
    include: ["urbit-key-generation"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },

      plugins: [
        GlobalPolyFill({
          process: true,
          buffer: true,
        }),
      ],
    },
  },

  resolve: {
    alias: {
      stream: "stream-browserify",
    },
  },
  worker: {
    plugins: [comlink()],
  },
});
