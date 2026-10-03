import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // GitHub Pages serves the site from /lumora-adaptive-learning-case-study/ (set in the Pages workflow);
  // Vercel and local development serve it from /.
  base: process.env.CASE_STUDY_BASE ?? "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: { port: 5174 },
  build: {
    sourcemap: false,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: { react: ["react", "react-dom"], motion: ["framer-motion"] },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
