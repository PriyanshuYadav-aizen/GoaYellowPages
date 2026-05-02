import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import connectDB from "./config/database.js";
import { generalLimiter } from "./middleware/rateLimiter.js";

import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const app = express();
const PORT: number = parseInt(process.env.PORT || "5001", 10);

// Connect to MongoDB
connectDB();

// Middleware
// If behind a proxy/load balancer (e.g., Render/Heroku/Nginx), enable trust proxy so rate-limit uses real client IP
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Apply rate limiting only to REST API paths (not to /graphql or static assets)
app.use(["/api"], generalLimiter);

// API routes - define these BEFORE the catch-all
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    database: "connected",
  });
});

// Test route to verify routing is working
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route working!", path: req.path });
});

// Apollo Server Setup
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  // âœ… Fix: Use any type to bypass the Express type conflict
  server.applyMiddleware({ app: app as any, path: "/graphql" });

  // Serve static files from the React app build directory AFTER API routes
  const clientBuildPath = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));

  // Debug: Check if client build exists
  console.log(`ðŸ” Checking client build path: ${clientBuildPath}`);
  if (fs.existsSync(clientBuildPath)) {
    console.log(`âœ… Client build directory exists`);
    const files = fs.readdirSync(clientBuildPath);
    console.log(`ðŸ“ Files in client build:`, files);

    const indexPath = path.join(clientBuildPath, "index.html");
    if (fs.existsSync(indexPath)) {
      console.log(`âœ… index.html exists at: ${indexPath}`);
    } else {
      console.log(`âŒ index.html NOT found at: ${indexPath}`);
    }
  } else {
    console.log(`âŒ Client build directory does NOT exist`);
  }

  // Catch-all handler: send back React's index.html file for any non-API routes
  // This MUST be defined AFTER static files but BEFORE starting the server
  app.get("*", (req: Request, res: Response) => {
    console.log(`ðŸŒ Catch-all route triggered for: ${req.path}`);

    // Skip API routes (shouldn't reach here, but just in case)
    if (req.path.startsWith("/api") || req.path.startsWith("/graphql")) {
      console.log(
        `âŒ API route ${req.path} reached catch-all - this shouldn't happen`
      );
      return res.status(404).json({ error: "API route not found" });
    }

    // Serve the React app for all other routes (including root "/")
    const indexPath = path.join(clientBuildPath, "index.html");
    console.log(
      `ðŸŒ Serving React app for route: ${req.path}, file: ${indexPath}`
    );

    // Check if file exists before trying to serve it
    if (!fs.existsSync(indexPath)) {
      console.error(`âŒ index.html not found at: ${indexPath}`);
      return res
        .status(500)
        .send(
          "Client build not found. Please check if the client was built successfully."
        );
    }

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`âŒ Error serving index.html:`, err);
        res.status(500).send("Error loading application");
      } else {
        console.log(`âœ… Successfully served index.html for route: ${req.path}`);
      }
    });
  });

  // Start the server AFTER setting up ALL routes
  app.listen(PORT, () => {
    console.log(`ðŸš€ Server is running on port ${PORT}`);
    console.log(`ðŸ“Š Health check: http://localhost:${PORT}/api/health`);
    console.log(`ðŸ“¡ GraphQL playground: http://localhost:${PORT}/graphql`);
    console.log(`ðŸ“ Client build path: ${clientBuildPath}`);
  });
};

startApolloServer();

export default app;
