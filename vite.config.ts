import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for azimuth-js lib to work
    global: {},
  },
});
