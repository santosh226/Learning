import express from 'express';
import ApiError from './common/utils/api-error.js';
import authRoutes from "./module/auth/auth.route.js";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route: ${req.originalUrl} not found`);
})

export default app;