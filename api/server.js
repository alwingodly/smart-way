import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";
import logger from "./utils/logger.js";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandlingMiddilewares/errorHandler.js"; // Fixed typo
import path from "path";

// Initialize dotenv for environment variables
dotenv.config();

const app = express();
const __dirname = path.dirname("");
const buildpath = path.join(__dirname, "../taskman/build");
app.use(express.static(buildpath));

// Set PORT from environment or default to 7700
const PORT = process.env.PORT || 7700;

// Connect to the database
connectDB();

// Trust the proxy to handle X-Forwarded-For headers correctly
app.set('trust proxy', 1);  // Trust first proxy

// Apply security headers with helmet
app.use(helmet());

// Set up CORS with credentials and your frontend's URL
app.use(
  cors({
    origin: "https://smart-way-taskman.onrender.com", // Frontend URL
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware for parsing cookies and request bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Define API routes
app.use("/smartway/auth", authRoute);
app.use("/smartway/admin", adminRoute);
app.use("/smartway/user", userRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server and log the running port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
