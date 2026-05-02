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
const database_1 = __importDefault(require("./config/database"));
const fileUpload_1 = require("./utils/fileUpload");
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "5000", 10);
(0, database_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.post("/api/upload/hero", fileUpload_1.upload.single("heroImage"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const fileUrl = (0, fileUpload_1.getFileUrl)(req.file.filename);
        res.json({
            message: "Hero image uploaded successfully",
            url: fileUrl,
            filename: req.file.filename,
        });
    }
    catch (error) {
        console.error("Error uploading hero image:", error);
        res.status(500).json({ error: "Failed to upload hero image" });
    }
});
app.post("/api/upload/gallery", fileUpload_1.upload.array("galleryImages", 10), (req, res) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const uploadedFiles = req.files.map((file) => ({
            url: (0, fileUpload_1.getFileUrl)(file.filename),
            filename: file.filename,
        }));
        res.json({
            message: "Gallery images uploaded successfully",
            files: uploadedFiles,
        });
    }
    catch (error) {
        console.error("Error uploading gallery images:", error);
        res.status(500).json({ error: "Failed to upload gallery images" });
    }
});
app.get("/", (req, res) => {
    res.json({
        message: "Goa Yellow Pages API",
        status: "running",
        timestamp: new Date().toISOString(),
    });
});
app.get("/api/health", (req, res) => {
    res.json({
        message: "Server is running!",
        timestamp: new Date().toISOString(),
        database: "connected",
    });
});
const startApolloServer = async () => {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        context: ({ req }) => ({ req }),
    });
    await server.start();
    server.applyMiddleware({ app: app, path: "/graphql" });
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        console.log(`📡 GraphQL playground: http://localhost:${PORT}/graphql`);
        console.log(`📁 Static files: http://localhost:${PORT}/uploads`);
    });
};
startApolloServer();
exports.default = app;
//# sourceMappingURL=server.js.map