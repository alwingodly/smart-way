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

// app.use(express.static(path.join(__dirname, "../taskman/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../taskman/build", "index.html"));
// });



const app = express();
const __dirname =  path.dirname("")
const buildpath = path.join(__dirname,"../taskman/build")
app.use(express.static(buildpath))
const PORT = process.env.PORT || 7700;
connectDB();
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);


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
