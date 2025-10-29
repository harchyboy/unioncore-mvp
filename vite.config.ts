import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "client", "index.html"),
    },
  },
  server: {
    port: 51666,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: [".hartz.ai", "union.hartz.ai"],
    cors: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
