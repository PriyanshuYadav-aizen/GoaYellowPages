"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const database_js_1 = __importDefault(require("./config/database.js"));
const rateLimiter_js_1 = require("./middleware/rateLimiter.js");
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_js_1 = __importDefault(require("./graphql/typeDefs.js"));
const resolvers_js_1 = __importDefault(require("./graphql/resolvers.js"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "5001", 10);
(0, database_js_1.default)();
app.set("trust proxy", 1);
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(["/api"], rateLimiter_js_1.generalLimiter);
app.get("/api/health", (req, res) => {
    res.json({
        message: "Server is running!",
        timestamp: new Date().toISOString(),
        database: "connected",
    });
});
app.get("/test", (req, res) => {
    res.json({ message: "Test route working!", path: req.path });
});
const startApolloServer = async () => {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_js_1.default,
        resolvers: resolvers_js_1.default,
        context: ({ req }) => ({ req }),
    });
    await server.start();
    server.applyMiddleware({ app: app, path: "/graphql" });
    const clientBuildPath = path_1.default.join(__dirname, "../../client/dist");
    app.use(express_1.default.static(clientBuildPath));
    console.log(`ðŸ” Checking client build path: ${clientBuildPath}`);
    if (fs_1.default.existsSync(clientBuildPath)) {
        console.log(`âœ… Client build directory exists`);
        const files = fs_1.default.readdirSync(clientBuildPath);
        console.log(`ðŸ“ Files in client build:`, files);
        const indexPath = path_1.default.join(clientBuildPath, "index.html");
        if (fs_1.default.existsSync(indexPath)) {
            console.log(`âœ… index.html exists at: ${indexPath}`);
        }
        else {
            console.log(`âŒ index.html NOT found at: ${indexPath}`);
        }
    }
    else {
        console.log(`âŒ Client build directory does NOT exist`);
    }
    app.get("*", (req, res) => {
        console.log(`ðŸŒ Catch-all route triggered for: ${req.path}`);
        if (req.path.startsWith("/api") || req.path.startsWith("/graphql")) {
            console.log(`âŒ API route ${req.path} reached catch-all - this shouldn't happen`);
            return res.status(404).json({ error: "API route not found" });
        }
        const indexPath = path_1.default.join(clientBuildPath, "index.html");
        console.log(`ðŸŒ Serving React app for route: ${req.path}, file: ${indexPath}`);
        if (!fs_1.default.existsSync(indexPath)) {
            console.error(`âŒ index.html not found at: ${indexPath}`);
            return res
                .status(500)
                .send("Client build not found. Please check if the client was built successfully.");
        }
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error(`âŒ Error serving index.html:`, err);
                res.status(500).send("Error loading application");
            }
            else {
                console.log(`âœ… Successfully served index.html for route: ${req.path}`);
            }
        });
    });
    app.listen(PORT, () => {
        console.log(`ðŸš€ Server is running on port ${PORT}`);
        console.log(`ðŸ“Š Health check: http://localhost:${PORT}/api/health`);
        console.log(`ðŸ“¡ GraphQL playground: http://localhost:${PORT}/graphql`);
        console.log(`ðŸ“ Client build path: ${clientBuildPath}`);
    });
};
startApolloServer();
exports.default = app;
//# sourceMappingURL=server.js.map