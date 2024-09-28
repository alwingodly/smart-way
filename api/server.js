import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import adminRoute from './routes/adminRoute.js';
import userRoute from './routes/userRoute.js';
import logger from './utils/logger.js';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandlingMiddilewares/errrorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 7700;

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-default-secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use('/smartway/auth', authRoute);
app.use('/smartway/admin',adminRoute);
app.use('/smartway/user',userRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
