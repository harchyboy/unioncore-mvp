import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Always use port 5879
  const port = parseInt(process.env.PORT || "5879", 10);

  // Serve static files from dist/public
  // In production: dist/public (Docker build)
  // In development: ../dist/public (after npm run build)
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  console.log(`Serving static files from: ${staticPath}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`\n🚀 Server running on http://localhost:${port}/`);
    console.log(`📂 Static files: ${staticPath}`);
    console.log(`🌍 Press Ctrl+C to stop\n`);
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
