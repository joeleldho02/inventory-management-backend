import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ErrorHandler from "./libs/middleware/errorHandler";
import invalidApiCall from "./libs/middleware/invalidApiCall";
import logger from 'morgan';
import userRoutes from './router/user.router' 
import adminRoutes from './router/admin.router' 

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND__URL,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}));

app.use(logger('dev'));

app.use('/api/auth-service/admin', adminRoutes);
app.use('/api/auth-service/user', userRoutes);

app.use(invalidApiCall);
app.use(ErrorHandler);

export { app };