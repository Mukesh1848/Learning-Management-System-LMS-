import { generateToken } from "../../utils/generateToken.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please supply all the required fields...",
      });
    }

    const doesUserExit = await User.findOne({ email });
    if (doesUserExit) {
      return res.status(400).json({
        success: false,
        message: "User already exit with this email...",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      success: true,
      message: "User register successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to register user...",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please supply all the required fields...",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or password...",
      });
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or password...",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to login user...",
    });
  }
};
