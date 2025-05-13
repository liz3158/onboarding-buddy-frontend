import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(() => ({
  // base: command === "serve" ? "/" : "/onboarding-buddy-frontend/",
  plugins: [react()],
  optimizeDeps: {
    include: ["@monaco-editor/react"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  assetsInclude: ["**/*.svg"],
}));
