import express from 'express';
import ApiError from './common/utils/api-error.js';

const app = express();

app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route: ${req.originalUrl} not found`);
})

export default app;