"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const NormalUser_js_1 = __importDefault(require("../../models/NormalUser.js"));
const normalUserResolvers = {
    Mutation: {
        userRegister: async (_, { name, email, password }) => {
            const existing = await NormalUser_js_1.default.findOne({ email });
            if (existing)
                throw new Error("User already exists");
            const hashed = await bcryptjs_1.default.hash(password, 12);
            const user = new NormalUser_js_1.default({ name, email, password: hashed });
            await user.save();
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            };
        },
        userLogin: async (_, { email, password }) => {
            const user = await NormalUser_js_1.default.findOne({ email });
            if (!user)
                throw new Error("User not found");
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid password");
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return token;
        },
    },
};
exports.default = normalUserResolvers;
//# sourceMappingURL=normalUser.js.map