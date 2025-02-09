import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/database/db.js";
import userRoute from "./src/routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

// middlewares

//express.json() is a built-in middleware in Express.js that parses incoming JSON payloads from the request body and makes them available in req.body
app.use(express.json());

//The cookie-parser middleware extracts cookies from the request headers and makes them available in req.cookies.
app.use(cookieParser());

//apis

app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
