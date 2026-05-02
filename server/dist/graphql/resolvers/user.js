"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const resolvers = {
    Query: {
        getUsers: async () => {
            return await User_1.default.find().select("-password");
        },
    },
    Mutation: {
        register: async (_, { name, email, password, role }) => {
            const existingUser = await User_1.default.findOne({ email });
            if (existingUser)
                throw new Error("User already exists");
            const userCount = await User_1.default.countDocuments();
            let userRole = role || "admin";
            if (userCount === 0) {
                userRole = "superadmin";
                console.log("First user registered - assigning super admin role");
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 12);
            const user = new User_1.default({
                name,
                email,
                password: hashedPassword,
                role: userRole,
            });
            await user.save();
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
        },
        login: async (_, { email, password }) => {
            const user = await User_1.default.findOne({ email });
            if (!user)
                throw new Error("User not found");
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid password");
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return token;
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=user.js.map