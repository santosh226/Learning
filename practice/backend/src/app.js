import express from 'express';

const app = express();

app.all("{*path}", (req, res) => {

})

export default app;