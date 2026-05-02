import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import mongoose from "mongoose";

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find().select("-password");
    },
  },

  Mutation: {
    register: async (_: any, { name, email, password, role }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      // Check if this is the first user (super admin)
      const userCount = await User.countDocuments();
      let userRole = role || "admin";

      // If this is the first user, make them super admin
      if (userCount === 0) {
        userRole = "superadmin";
        console.log("First user registered - assigning super admin role");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
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

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid password");

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          businessId: user.businessId,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      return token;
    },

    createAdmin: async (
      _: any,
      { name, email, password, businessId }: any,
      context: any
    ) => {
      // Check if user is authenticated and is superadmin
      if (!context.req.headers.authorization) {
        throw new Error("Authentication required");
      }

      const token = context.req.headers.authorization.replace("Bearer ", "");
      let decoded;

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      } catch (error) {
        throw new Error("Invalid token");
      }

      // Check if user is superadmin
      if (decoded.role !== "superadmin") {
        throw new Error("Only superadmins can create admin users");
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      // If businessId is provided, verify the business exists
      if (businessId) {
        const Business = mongoose.model("Business");
        const business = await Business.findById(businessId);
        if (!business) {
          throw new Error("Business not found");
        }
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
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

    updateUser: async (
      _: any,
      { id, name, email, businessId }: any,
      context: any
    ) => {
      // Check if user is authenticated and is superadmin
      if (!context.req.headers.authorization) {
        throw new Error("Authentication required");
      }

      const token = context.req.headers.authorization.replace("Bearer ", "");
      let decoded;

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      } catch (error) {
        throw new Error("Invalid token");
      }

      // Check if user is superadmin
      if (decoded.role !== "superadmin") {
        throw new Error("Only superadmins can update users");
      }

      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      // Check if trying to update a superadmin (prevent downgrading superadmin)
      if (user.role === "superadmin" && decoded.id !== id) {
        throw new Error("Cannot modify superadmin users");
      }

      // If email is being updated, check if it's already taken
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email already exists");
        }
      }

      // If businessId is provided, verify the business exists
      if (businessId) {
        const Business = mongoose.model("Business");
        const business = await Business.findById(businessId);
        if (!business) {
          throw new Error("Business not found");
        }
      }

      // Update user fields
      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (businessId !== undefined) updateData.businessId = businessId || null;

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
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

    deleteUser: async (_: any, { id }: any, context: any) => {
      // Check if user is authenticated and is superadmin
      if (!context.req.headers.authorization) {
        throw new Error("Authentication required");
      }

      const token = context.req.headers.authorization.replace("Bearer ", "");
      let decoded;

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      } catch (error) {
        throw new Error("Invalid token");
      }

      // Check if user is superadmin
      if (decoded.role !== "superadmin") {
        throw new Error("Only superadmins can delete users");
      }

      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      // Prevent deleting superadmin users
      if (user.role === "superadmin") {
        throw new Error("Cannot delete superadmin users");
      }

      // Prevent deleting yourself
      if (decoded.id === id) {
        throw new Error("Cannot delete your own account");
      }

      await User.findByIdAndDelete(id);
      return true;
    },
  },
};

export default resolvers;
