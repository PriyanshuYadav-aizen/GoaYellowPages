"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = __importDefault(require("../../models/User.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers = {
    Query: {
        getUsers: async () => {
            return await User_js_1.default.find().select("-password");
        },
    },
    Mutation: {
        register: async (_, { name, email, password, role }) => {
            const existingUser = await User_js_1.default.findOne({ email });
            if (existingUser)
                throw new Error("User already exists");
            const userCount = await User_js_1.default.countDocuments();
            let userRole = role || "admin";
            if (userCount === 0) {
                userRole = "superadmin";
                console.log("First user registered - assigning super admin role");
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 12);
            const user = new User_js_1.default({
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
            const user = await User_js_1.default.findOne({ email });
            if (!user)
                throw new Error("User not found");
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid password");
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                email: user.email,
                role: user.role,
                businessId: user.businessId,
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return token;
        },
        createAdmin: async (_, { name, email, password, businessId }, context) => {
            if (!context.req.headers.authorization) {
                throw new Error("Authentication required");
            }
            const token = context.req.headers.authorization.replace("Bearer ", "");
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            }
            catch (error) {
                throw new Error("Invalid token");
            }
            if (decoded.role !== "superadmin") {
                throw new Error("Only superadmins can create admin users");
            }
            const existingUser = await User_js_1.default.findOne({ email });
            if (existingUser)
                throw new Error("User already exists");
            if (businessId) {
                const Business = mongoose_1.default.model("Business");
                const business = await Business.findById(businessId);
                if (!business) {
                    throw new Error("Business not found");
                }
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 12);
            const user = new User_js_1.default({
                name,
                email,
                password: hashedPassword,
                role: "admin",
                businessId: businessId || null,
            });
            await user.save();
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                businessId: user.businessId,
            };
        },
        updateUser: async (_, { id, name, email, businessId }, context) => {
            if (!context.req.headers.authorization) {
                throw new Error("Authentication required");
            }
            const token = context.req.headers.authorization.replace("Bearer ", "");
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            }
            catch (error) {
                throw new Error("Invalid token");
            }
            if (decoded.role !== "superadmin") {
                throw new Error("Only superadmins can update users");
            }
            const user = await User_js_1.default.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role === "superadmin" && decoded.id !== id) {
                throw new Error("Cannot modify superadmin users");
            }
            if (email && email !== user.email) {
                const existingUser = await User_js_1.default.findOne({ email });
                if (existingUser) {
                    throw new Error("Email already exists");
                }
            }
            if (businessId) {
                const Business = mongoose_1.default.model("Business");
                const business = await Business.findById(businessId);
                if (!business) {
                    throw new Error("Business not found");
                }
            }
            const updateData = {};
            if (name)
                updateData.name = name;
            if (email)
                updateData.email = email;
            if (businessId !== undefined)
                updateData.businessId = businessId || null;
            const updatedUser = await User_js_1.default.findByIdAndUpdate(id, updateData, {
                new: true,
            }).select("-password");
            if (!updatedUser) {
                throw new Error("Failed to update user");
            }
            return {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                businessId: updatedUser.businessId,
            };
        },
        deleteUser: async (_, { id }, context) => {
            if (!context.req.headers.authorization) {
                throw new Error("Authentication required");
            }
            const token = context.req.headers.authorization.replace("Bearer ", "");
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            }
            catch (error) {
                throw new Error("Invalid token");
            }
            if (decoded.role !== "superadmin") {
                throw new Error("Only superadmins can delete users");
            }
            const user = await User_js_1.default.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role === "superadmin") {
                throw new Error("Cannot delete superadmin users");
            }
            if (decoded.id === id) {
                throw new Error("Cannot delete your own account");
            }
            await User_js_1.default.findByIdAndDelete(id);
            return true;
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=user.js.map