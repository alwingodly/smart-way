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
import errorHandler from "./middlewares/errorHandlingMiddilewares/errrorHandler.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.dirname("");
const buildpath = path.join(__dirname, "../taskman/build");
app.use(express.static(buildpath));
const PORT = process.env.PORT || 7700;

connectDB();
app.use(helmet());

// CORS setup
app.use(
  cors({
    origin: "https://smart-way-final-taskman.vercel.app", // Frontend URL
    methods: "GET, POST, PUT, DELETE", // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Handle preflight requests explicitly
app.options('*', cors({
  origin: "https://smart-way-final-taskman.vercel.app",
  credentials: true, // Allow credentials for preflight
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/smartway/auth", authRoute);
app.use("/smartway/admin", adminRoute);
app.use("/smartway/user", userRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
