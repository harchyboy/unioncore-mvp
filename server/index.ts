import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import negotiationRoutes from "./routes/negotiation/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.resolve(
      __dirname,
      "..",
      "client",
      "uploads",
      "properties"
    );
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "property-" + uniqueSuffix + ext);
  },
});

// File filter to only accept images
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, WebP) are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable JSON parsing
  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Serve uploaded images
  const uploadsPath = path.resolve(__dirname, "..", "client", "uploads");
  app.use("/uploads", express.static(uploadsPath));

  // API Routes

  // Mount negotiation routes
  app.use("/api/negotiation", negotiationRoutes);

  // Upload single image
  app.post(
    "/api/properties/upload-image",
    upload.single("image"),
    (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        // Return the URL path to the uploaded image
        const imageUrl = `/uploads/properties/${req.file.filename}`;

        res.json({
          success: true,
          imageUrl: imageUrl,
          filename: req.file.filename,
        });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload image" });
      }
    }
  );

  // Upload multiple images
  app.post(
    "/api/properties/upload-images",
    upload.array("images", 10),
    (req, res) => {
      try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
          return res.status(400).json({ error: "No files uploaded" });
        }

        // Return array of uploaded image URLs
        const imageUrls = req.files.map(file => ({
          imageUrl: `/uploads/properties/${file.filename}`,
          filename: file.filename,
        }));

        res.json({
          success: true,
          images: imageUrls,
        });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload images" });
      }
    }
  );

  // Delete image
  app.delete("/api/properties/delete-image/:filename", (req, res) => {
    try {
      const filename = req.params.filename;

      // Validate filename to prevent directory traversal
      if (filename.includes("..") || filename.includes("/")) {
        return res.status(400).json({ error: "Invalid filename" });
      }

      const filePath = path.resolve(
        __dirname,
        "..",
        "client",
        "uploads",
        "properties",
        filename
      );

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      // Delete the file
      fs.unlinkSync(filePath);

      res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Error handling middleware for multer
  app.use(
    (
      error: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "File size too large. Maximum size is 5MB." });
        }
        return res.status(400).json({ error: error.message });
      } else if (error) {
        return res.status(400).json({ error: error.message });
      }
      next();
    }
  );

  // Handle client-side routing - serve index.html for all other routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = Number(process.env.PORT) || 5879;

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(
      `Image uploads will be stored in: ${path.resolve(__dirname, "..", "client", "uploads", "properties")}`
    );
  });
}

startServer().catch(console.error);
