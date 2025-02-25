import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken?.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "Invalid access token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "Invalid access token",
    });
  }
};
