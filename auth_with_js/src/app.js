import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.route.js";
import ApiError from "./common/utils/api-error.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.all("{*path}", (req, _) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`)
});

export default app;