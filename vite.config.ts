import wasm from "vite-plugin-wasm";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react(), wasm()],
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
});
