import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [comlink(), react(), tailwindcss()],
  worker: {
    plugins: () => [comlink()],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
