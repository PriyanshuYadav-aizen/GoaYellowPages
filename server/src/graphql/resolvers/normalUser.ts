import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import NormalUser from "../../models/NormalUser.js";

const normalUserResolvers = {
  Mutation: {
    userRegister: async (_: any, { name, email, password }: any) => {
      const existing = await NormalUser.findOne({ email });
      if (existing) throw new Error("User already exists");
      const hashed = await bcrypt.hash(password, 12);
      const user = new NormalUser({ name, email, password: hashed });
      await user.save();
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    },
    userLogin: async (_: any, { email, password }: any) => {
      const user = await NormalUser.findOne({ email });
      if (!user) throw new Error("User not found");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid password");
      const token = jwt.sign(
        { id: user._id, email: user.email, role: "user" },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
      return token;
    },
  },
};

export default normalUserResolvers;


