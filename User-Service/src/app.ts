import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./router/user.router";
import ErrorHandler from "./libs/middleware/errorHandler";
import invalidApiCall from "./libs/middleware/invalidApiCall";
import logger from 'morgan';
import { authSvcConsumer } from "./events/auth-svc.consumer";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    // origin: process.env.FRONTEND__URL,
    origin: 'http://localhost:4200',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}));

app.use(logger('dev'));

authSvcConsumer();

app.use('/api/user-service', userRoutes);

app.use(invalidApiCall);
app.use(ErrorHandler);

export { app };