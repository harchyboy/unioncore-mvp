import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(import.meta.dirname, "client", "property_index.js"),
          dest: ".",
        },
        {
          src: path.resolve(
            import.meta.dirname,
            "client",
            "properties_data.js"
          ),
          dest: ".",
        },
        {
          src: path.resolve(
            import.meta.dirname,
            "client",
            "property_detail.js"
          ),
          dest: ".",
        },
        {
          src: path.resolve(
            import.meta.dirname,
            "client",
            "space_allocation.js"
          ),
          dest: ".",
        },
        {
          src: path.resolve(
            import.meta.dirname,
            "client",
            "add_property_modal.js"
          ),
          dest: ".",
        },
      ],
    }),
  ],
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
    strictPort: false,
    host: "0.0.0.0",
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Frame-Options": "ALLOWALL",
    },
  },
});
